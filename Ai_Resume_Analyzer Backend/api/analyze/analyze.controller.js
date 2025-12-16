const {
  buildPromptAndCallLLM,
  makeRepairPrompt,
} = require("../../services/llmService");

const {
  ResponseSchema,
  normalizeSkill,
  parseLLMJson,
  computeServerScore,
} = require("../../services/scoringService");

const { extractResumeText } = require("../../services/resumeParser");
const { extractSkillsFromText } = require("../../services/skillExtractor");

// -------------------------
// Main Controller Function
// -------------------------

const analyzeResume = async (req, res) => {
  let uploadedPath = null;
  try {
    const jobDescription = req.body?.jobDescription || "";
    const resumeTextFromBody = req.body?.resumeText || "";
    const resumeText = await extractResumeText(req.file, resumeTextFromBody);

    if (
      !resumeText ||
      typeof resumeText !== "string" ||
      resumeText.trim() === ""
    ) {
      return res.status(400).json({
        error: "resumeText is required or upload a resume file",
      });
    }

    const llmText = await buildPromptAndCallLLM({
      resumeText,
      jobDescription,
    });

    let parsed;
    try {
      parsed = parseLLMJson(llmText);
    } catch (err) {
      return res.status(502).json({
        error: "LLM JSON parse error",
        llm_raw: llmText,
        details: err.message,
      });
    }

    try {
      const validated = ResponseSchema.parse(parsed);

      validated.matched_skills = validated.matched_skills.map(normalizeSkill);
      validated.missing_skills = validated.missing_skills.map(normalizeSkill);

      const serverScore = computeServerScore(
        validated.matched_skills,
        validated.missing_skills
      );

      const diff = Math.abs((validated.match_score || 0) - serverScore);

      const result = {
        ...validated,
        server_match_score: serverScore,
        llm_raw: llmText,
      };

      if (diff > 20) {
        result.note =
          "Server computed match_score differs significantly from LLM; prefer server_match_score.";
      }

      return res.json({ success: true, result });
    } catch (validationError) {
      const schemaHint = `{"match_score":number,"matched_skills":[string],"missing_skills":[string],"suggestions":string}`;

      const repairPrompt = makeRepairPrompt({
        previousOutput: llmText,
        schemaHint,
      });

      try {
        const repairedText = await buildPromptAndCallLLM({
          resumeText: repairPrompt,
          jobDescription: "",
        });

        const repairedParsed = parseLLMJson(repairedText);
        const repairedValidated = ResponseSchema.parse(repairedParsed);

        repairedValidated.matched_skills =
          repairedValidated.matched_skills.map(normalizeSkill);

        repairedValidated.missing_skills =
          repairedValidated.missing_skills.map(normalizeSkill);

        const serverScore = computeServerScore(
          repairedValidated.matched_skills,
          repairedValidated.missing_skills
        );

        const diff = Math.abs(
          (repairedValidated.match_score || 0) - serverScore
        );

        const result = {
          ...repairedValidated,
          server_match_score: serverScore,
          llm_raw: llmText,
          repair_raw: repairedText,
        };

        if (diff > 20) {
          result.note =
            "Server computed match_score differs significantly from LLM; prefer server_match_score.";
        }

        return res.json({ success: true, result });
      } catch (repairErr) {
        console.warn("LLM RAW OUTPUT (parse failed):", llmText);
        return res.status(502).json({
          error: "Invalid LLM output and repair failed",
          llm_raw: llmText,
          validation_errors: validationError.errors,
          repair_error: repairErr.message,
        });
      }
    }
  } catch (err) {
    console.error("analyzeResume error:", err);

    const isOverload =
      err?.status === 503 ||
      (err?.message && err.message.toLowerCase().includes("overload"));

    if (isOverload) {
      return res.status(503).json({
        error: "Model overloaded. Try again shortly.",
        retry_after_seconds: 10,
      });
    }

    return res.status(500).json({ error: err.message });
  }
};

module.exports = { analyzeResume };
