const { getSkillWeight } = require("./skillWeights");

const computeSkillScore = (
  matchedSkills = [],
  missingSkills = [],
  partialMatchedSkills = [],
  options = {}
) => {
  const { dynamicWeights = {}, defaultWeight = 5 } = options;
  let matchedWeight = 0;
  let totalWeight = 0;

  const resolveWeight = (skill) => {
    if (dynamicWeights && dynamicWeights[skill]) {
      return dynamicWeights[skill];
    }
    const staticWeight = getSkillWeight(skill);
    return staticWeight || defaultWeight;
  };

  matchedSkills.forEach((s) => {
    const w = resolveWeight(s);
    matchedWeight += w;
    totalWeight += w;
  });

  partialMatchedSkills.forEach((s) => {
    const w = resolveWeight(s);
    matchedWeight += w * 0.5;
    totalWeight += w;
  });

  missingSkills.forEach((s) => {
    totalWeight += resolveWeight(s);
  });

  if (totalWeight === 0) return { match_score: 0 };

  return {
    match_score: Math.round((matchedWeight / totalWeight) * 100),
  };
};

module.exports = { computeSkillScore };
