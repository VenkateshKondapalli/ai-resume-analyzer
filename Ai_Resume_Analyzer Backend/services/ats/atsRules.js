function computeATSDecision({
  match_score,
  missing_core_skills = [],
  missing_secondary_skills = [],
}) {
  if (missing_core_skills.length > 0) {
    return {
      decision: "REJECT",
      reason: "Missing core ATS skills",
    };
  }

  if (match_score < 40 && missing_secondary_skills.length > 0) {
    return {
      decision: "REJECT",
      reason: "Missing important ATS keywords",
    };
  }

  return {
    decision: "PASS",
    reason: "Strong match for the role",
  };
}

module.exports = { computeATSDecision };
