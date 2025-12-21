const DEFAULT_WEIGHT = 5;

function resolveSkillsWeights(jdImpotance = {}) {
  const weights = {};
  const { core_skills = [], secondary_skills = [] } = jdImpotance;

  core_skills.forEach((skill) => {
    weights[skill] = 10;
  });

  secondary_skills.forEach((skill) => {
    weights[skill] = 6;
  });

  return weights;
}

module.exports = { DEFAULT_WEIGHT, resolveSkillsWeights };
