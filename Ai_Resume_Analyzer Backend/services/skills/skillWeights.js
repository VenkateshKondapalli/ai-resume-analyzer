const SKILL_WEIGHTS = {
  // Core backend
  "Node.js": 3,
  "Express.js": 2,
  "JavaScript": 3,

  // Databases
  "MongoDB": 2,
  "SQL": 2,

  // DevOps
  "Docker": 2,
  "Kubernetes": 2,
  "AWS": 2,

  // Tools
  "Git": 1,
  "REST APIs": 1,
};

const DEFAULT_WEIGHT = 1;

const getSkillWeight = (skill) => {
  return SKILL_WEIGHTS[skill] || DEFAULT_WEIGHT;
};

module.exports = { getSkillWeight };
