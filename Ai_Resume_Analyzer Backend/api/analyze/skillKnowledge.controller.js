const { runSkillRag } = require("../../services/rag/ragPipeline.service");

const getSkillKnowledgeController = async (req, res) => {
  try {
    const { skill } = req.body || {};

    if (!skill || typeof skill !== "string" || skill.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "skill is required and must be a non-empty string",
      });
    }

    const explanation = runSkillRag(skill.trim());

    return res.json({
      skill: skill.trim(),
      explanation,
    });
  } catch (err) {
    console.error("getSkillKnowledgeController error:", err);

    const isOverload =
      err?.status === 503 || err?.message?.toLowerCase().includes("overload");

    if (isOverload) {
      return res.status(503).json({
        success: false,
        error: "Model overloaded. Try again shortly.",
        retry_after_seconds: 10,
      });
    }

    return res.status(500).json({
      success: false,
      error: err.message || "Failed to fetch skill knowledge",
    });
  }
};

module.exports = { getSkillKnowledgeController };
