const { computeATSDecision } = require("./atsRules");
const { evaluateATSSkills } = require("./atsSkillEvaluator");

function stimulateATS({ skillResult, jdImportance }) {
  const { missing_core_skills } = evaluateATSSkills({
    missing_skills: skillResult.missing_skills,
    jd_importance: jdImportance,
  });

  const decisionResult = computeATSDecision({
    match_score: skillResult.match_score,
    missing_core_skills,
  });

  return {
    ats_decision: decisionResult.decision,
    ats_reason: decisionResult.reason,
    missing_core_skills,
  };
}

module.exports = { stimulateATS };
