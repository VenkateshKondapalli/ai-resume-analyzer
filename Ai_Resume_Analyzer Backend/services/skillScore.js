const computeSkillScore = (matchedSkills = [], missingSkills = []) => {
  const mCount = Array.isArray(matchedSkills) ? matchedSkills.length : 0;
  const misCount = Array.isArray(missingSkills) ? missingSkills.length : 0;

  const totalCount = mCount + misCount;

  if (totalCount === 0) {
    return {
      score: 0,
      matchedCount: 0,
      missingCount: 0,
      totalCount: 0,
    };
  }

  const rawScore = (mCount / totalCount) * 100;
  const score = Math.min(100, Math.max(0, Math.round(rawScore)));

  return {
    score: score,
    matchedCount: mCount,
    missingCount: misCount,
    totalCount: totalCount,
  };
};

module.exports = { computeSkillScore };
