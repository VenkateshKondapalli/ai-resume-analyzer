const fs = require("fs");
const pdfParse = require("pdf-parse");
const { z } = require("zod");
const {
  buildPromptAndCallLLM,
  makeRepairPrompt,
} = require("../../utils/prompt");

const ResponseSchema = z.object({
  match_score: z.number().min(0).max(100),
  matched_skills: z.array(z.string()),
  missing_skills: z.array(z.string()),
  suggestions: z.string(),
});

const SKILL_NORMALIZE = {
  node: "Node.js",
  "node.js": "Node.js",
  mongodb: "MongoDB",
  reactjs: "React",
  react: "React",
  js: "JavaScript",
  javascript: "JavaScript",
};

function normalizeSkill(s) {
  if (!s) return s;
  const sClean = s.trim().toLowerCase();
  return SKILL_NORMALIZE[sClean] || s.trim();
}

function parseLLMJson(llmText) {
  try {
    return JSON.parse(llmText);
  } catch (parseErr) {
    const match = llmText.match(/\{[\s\S]*\}$/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e) {
        throw new Error(`LLM JSON parse failed: ${e.message}`);
      }
    }
    throw new Error(`LLM output parse error: ${parseErr.message}`);
  }
}

function computeServerScore(matchedSkills = [], missingSkills = []) {
  const total = matchedSkills.length + missingSkills.length;
  if (total === 0) return 0;
  const ratio = matchedSkills.length / total;
  return Math.round(ratio * 100);
}

const analyzeResume = async (req, res) => {
  let uploadedPath = null;
  try {
    // console.log("=== ANALYZE DEBUG ===");
    // console.log("content-type header:", req.headers["content-type"]);
    // console.log("req.body keys:", Object.keys(req.body || {}));
    // console.log(
    //   "req.file present:",
    //   !!req.file,
    //   req.file
    //     ? {
    //         fieldname: req.file.fieldname,
    //         originalname: req.file.originalname,
    //         mimetype: req.file.mimetype,
    //         path: req.file.path,
    //         size: req.file.size,
    //       }
    //     : null+
    // );
    // console.log("=====================");

    let resumeText = req.body?.resumeText || "";
    const jobDescription = req.body?.jobDescription || "";

    if (!resumeText && req.file) {
      uploadedPath = req.file.path;
      const buffer = fs.readFileSync(uploadedPath);
      const data = await pdfParse(buffer);
      resumeText = data.text || "";
      try {
        fs.unlinkSync(uploadedPath);
        uploadedPath = null;
      } catch (e) {}
    }

    if (
      !resumeText ||
      typeof resumeText !== "string" ||
      resumeText.trim() === ""
    ) {
      return res.status(400).json({
        error: "resumeText is required in body or upload a resume file",
      });
    }

    const MAX_CHARS = 18000;
    resumeText =
      resumeText.length > MAX_CHARS
        ? resumeText.slice(0, MAX_CHARS) + "\n...[truncated]"
        : resumeText;

    const llmText = await buildPromptAndCallLLM({ resumeText, jobDescription });

    let parsed = null;
    try {
      parsed = parseLLMJson(llmText);
    } catch (parseError) {
      return res.status(502).json({
        error: "LLM JSON parse error",
        llm_raw: llmText,
        details: parseError.message,
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
      if (diff > 20)
        result.note =
          "Server computed match_score differs significantly from LLM; prefer server_match_score";

      return res.json({ success: true, result });
    } catch (zErr) {
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
        if (diff > 20)
          result.note =
            "Server computed match_score differs significantly from LLM; prefer server_match_score";

        return res.json({ success: true, result });
      } catch (repairErr) {
        return res.status(502).json({
          error: "Invalid LLM output (schema mismatch) and repair failed",
          llm_raw: llmText,
          validation_errors: zErr.errors,
          repair_error: String(repairErr.message || repairErr),
        });
      }
    }
  } catch (error) {
    console.error("analyzeResume error:", error);
    const isOverload =
      error?.status === 503 ||
      (error?.message && error.message.toLowerCase().includes("overload"));
    if (isOverload) {
      return res
        .status(503)
        .json({
          error: "Model overloaded. Try again shortly.",
          retry_after_seconds: 10,
        });
    }
    return res.status(500).json({ error: String(error.message || error) });
  } finally {
    try {
      if (uploadedPath && fs.existsSync(uploadedPath))
        fs.unlinkSync(uploadedPath);
    } catch (cleanupErr) {
      console.warn("Error during cleanup:", cleanupErr);
    }
  }
};

module.exports = { analyzeResume };
