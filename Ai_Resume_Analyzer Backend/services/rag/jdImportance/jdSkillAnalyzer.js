const DEFAULT_SKILLS = [
  "AWS",
  "Node.js",
  "Express",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "SQL",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "CI/CD",
  "GraphQL",
];

/**
 * Normalize text for matching
 */
function normalize(text = "") {
  return text.toLowerCase();
}

/**
 * Count how frequently each skill appears across JDs
 */
function extractSkillFrequency(similarJDs, skillsList = DEFAULT_SKILLS) {
  const frequencyMap = {};

  skillsList.forEach((skill) => {
    frequencyMap[skill] = 0;
  });

  similarJDs.forEach((doc) => {
    const content = normalize(doc.pageContent || "");

    skillsList.forEach((skill) => {
      const skillKey = normalize(skill);
      if (content.includes(skillKey)) {
        frequencyMap[skill] += 1;
      }
    });
  });

  return frequencyMap;
}

/**
 * Classify skills based on frequency thresholds
 */
function classifySkills(frequencyMap, totalDocs) {
  const core_skills = [];
  const secondary_skills = [];
  const optional_skills = [];

  Object.entries(frequencyMap).forEach(([skill, count]) => {
    const ratio = count / totalDocs;

    if (ratio >= 0.6) {
      core_skills.push(skill);
    } else if (ratio >= 0.3) {
      secondary_skills.push(skill);
    } else if (ratio > 0) {
      optional_skills.push(skill);
    }
  });

  return {
    core_skills,
    secondary_skills,
    optional_skills,
  };
}

/**
 * MAIN ENTRY
 */
function analyzeJDSkillImportance(
  similarJDs = [],
  skillsList = DEFAULT_SKILLS
) {
  if (!similarJDs.length) {
    return {
      core_skills: [],
      secondary_skills: [],
      optional_skills: [],
    };
  }

  const frequencyMap = extractSkillFrequency(similarJDs, skillsList);

  return classifySkills(frequencyMap, similarJDs.length);
}

module.exports = {
  analyzeJDSkillImportance,
};
