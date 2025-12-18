const { SKILL_CATEGORY, SKILL_EFFORT_MAP } = require("./roadmap.rules");

const buildRoadmapSkeleton = (missingSkills) => {
  return missingSkills.map((skill) => ({
    skill,
    category: SKILL_CATEGORY[skill] || "General",
    estimated_effort: SKILL_EFFORT_MAP[skill] || "2–4 weeks",
  }));
};

module.exports = { buildRoadmapSkeleton };
