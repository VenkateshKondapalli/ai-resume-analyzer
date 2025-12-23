function evaluateATSSkills({ missing_skills = [], jd_importance = {} }) {
  const missing_core_skills =
    jd_importance.core_skills?.filter((skill) =>
      missing_skills.includes(skill)
    ) || [];

  return {
    missing_core_skills,
  };
}

module.exports = { evaluateATSSkills };
