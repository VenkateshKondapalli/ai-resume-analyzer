function evaluateATSSkills({ missing_skills = [], jd_importance = {} }) {
  const core = jd_importance.core_skills || [];
  const secondary = jd_importance.secondary_skills || [];

  const normalize = (s) => s.toLowerCase().trim();
  const missingSet = missing_skills.map(normalize);

  const missing_core_skills = core.filter((s) =>
    missingSet.includes(normalize(s))
  );

  const missing_secondary_skills = secondary.filter((s) =>
    missingSet.includes(normalize(s))
  );

  return {
    missing_core_skills,
    missing_secondary_skills,
  };
}

module.exports = { evaluateATSSkills };
