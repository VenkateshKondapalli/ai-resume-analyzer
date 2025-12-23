const { simulateATS } = require("../../services/ats/atsSimulator");
const {
  generateExplanation,
} = require("../../services/llm/explanation.service");
const {
  getJDSkillImportance,
} = require("../../services/rag/jdImportance/jdImportance.service");
const { extractResumeText } = require("../../services/resumeParser");
const { analyzeSkills } = require("../../services/skills/analyzeSkills");

const analyzeResume = async (req, res) => {
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
        success: false,
        error: "resumeText is required or upload a resume file",
      });
    }

    // 1️⃣ RULE-BASED SKILL ANALYSIS (SOURCE OF TRUTH)
    const skillResult = analyzeSkills(
      resumeText,
      jobDescription,
      (options = {})
    );
    // console.log("Skill Analysis Result:", skillResult);

    // 2️⃣ LLM EXPLANATION (READ-ONLY)
    const explanation = await generateExplanation(skillResult);

    const jdImportance = await getJDSkillImportance(jobDescription);

    const atsResult = simulateATS({ skillResult, jdImportance });

    // 3️⃣ FINAL RESPONSE
    return res.json({
      success: true,
      result: {
        ...skillResult,
        explanation:
          explanation ||
          "Suggestions unavailable. Skill analysis above is accurate.",
        ats_simulation: atsResult,
      },
    });
  } catch (err) {
    console.error("analyzeResume error:", err);

    const isOverload =
      err?.status === 503 || err?.message?.toLowerCase().includes("overload");

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
