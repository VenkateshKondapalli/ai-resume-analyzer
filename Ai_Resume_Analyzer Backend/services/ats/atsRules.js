const ATS_THRESHOLDS = {
  PASS: 70,
  BORDERLINE: 50,
};

function computeATSDecision({ match_score, missing_core_skills = [] }) {
  if (missing_core_skills.length > 0) {
    return {
      decision: "REJECT",
      reason: "Missing required core skills",
    };
  }

  if (match_score >= ATS_THRESHOLDS.PASS) {
    return {
      decision: "PASS",
      reason: "Strong match for the role",
    };
  }

  if (match_score >= ATS_THRESHOLDS.BORDERLINE) {
    return {
      decision: "BORDERLINE",
      reason: "Partial match, may required review",
    };
  }
  return {
    decision: "REJECT",
    reason: "Low ATS score",
  };
}

module.exports = { computeATSDecision };
