const { getSkillWeight } = require("./skillWeights");

const computeConfidenceLevel = ({ match_score, missing_skills = [] }) => {
  const importantMissing = missing_skills.filter(
    (skill) => getSkillWeight(skill) >= 2
  );

  if (match_score >= 85 && importantMissing.length === 0) {
    return "High";
  }

  if (match_score >= 60 && importantMissing.length <= 2) {
    return "Medium";
  }

  return "Low";
};

module.exports = { computeConfidenceLevel };
