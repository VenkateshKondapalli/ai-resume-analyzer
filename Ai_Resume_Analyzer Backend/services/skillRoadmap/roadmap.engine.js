const { SKILL_CATEGORY, SKILL_EFFORT_MAP } = require("./roadmap.rules");

const buildRoadmapSkeleton = (missing_skills) => {
  if (!Array.isArray(missing_skills)) {
    console.error(
      "❌ roadmap.engine: missingSkills is not an array!",
      missing_skills
    );
    return [];
  }
  return missing_skills.map((skill) => ({
    skill,
    category: SKILL_CATEGORY[skill] || "General",
    estimated_effort: SKILL_EFFORT_MAP[skill] || "2–4 weeks",
  }));
};

module.exports = { buildRoadmapSkeleton };
