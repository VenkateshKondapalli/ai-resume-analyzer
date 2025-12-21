const {
  generateRoadmap,
} = require("../../services/skillRoadmap/roadmap.service");

const generateRoadmapController = async (req, res) => {
  try {
    const { missing_skills = [], role = "Backend Developer" } = req.body || {};

    if (!Array.isArray(missing_skills) || missing_skills.length === 0) {
      return res.status(400).json({
        success: true,
        error: "missing_skills must be a non-empty array",
      });
    }

    const roadmap = await generateRoadmap({ missing_skills, role });

    return res.json({
      success: true,
      result: {
        role,
        missing_skills,
        roadmap,
      },
    });
  } catch (err) {
    console.error("generateRoadmap error:", err);
    const isOverload =
      err?.status === 503 || err?.message?.toLowerCase().includes("overload");

    if (isOverload) {
      return res.status(503).json({
        error: "Model overloaded. Try again shortly.",
        retry_after_seconds: 10,
      });
    }

    return res.status(500).json({
      success: false,
      error: err.message || "Failed to generate roadmap",
    });
  }
};

module.exports = { generateRoadmapController };
