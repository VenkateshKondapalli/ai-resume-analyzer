const { getSkillWeight } = require("./skillWeights");

const computeSkillScore = (
  matchedSkills = [],
  missingSkills = [],
  partialMatchedSkills = []
) => {
  let matchedWeight = 0;
  let totalWeight = 0;

  matchedSkills.forEach((s) => {
    const w = getSkillWeight(s);
    matchedWeight += w;
    totalWeight += w;
  });

  partialMatchedSkills.forEach((s) => {
    const w = getSkillWeight(s);
    matchedWeight += w * 0.5;
    totalWeight += w;
  });

  missingSkills.forEach((s) => {
    totalWeight += getSkillWeight(s);
  });

  if (totalWeight === 0) return { match_score: 0 };

  return {
    match_score: Math.round((matchedWeight / totalWeight) * 100),
  };
};

module.exports = { computeSkillScore };
