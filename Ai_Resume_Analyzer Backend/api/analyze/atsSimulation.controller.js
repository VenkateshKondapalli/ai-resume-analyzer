const { stimulateATS } = require("../../services/ats/atsSimulator");
const {
  getJDSkillImportance,
} = require("../../services/rag/jdImportance/jdImportance.service");
const { analyzeSkills } = require("../../services/skills/analyzeSkills");

const simulateATSController = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        error: "resumeText and jobDescription are required",
      });
    }

    const skillResult = analyzeSkills(resumeText, jobDescription);

    const jdImportance = await getJDSkillImportance(jobDescription);

    const atsResult = stimulateATS({
      skillResult,
      jdImportance,
    });
    return res.json({
      success: true,
      result: {
        ...skillResult,
        jd_importance: jdImportance,
        ats_simulation: atsResult,
      },
    });
  } catch (err) {
    console.error("ATS Simulation error:", err);
    return res.status(500).json({
      success: false,
      error: "ATS simulation failed",
    });
  }
};

module.exports = { simulateATSController };
