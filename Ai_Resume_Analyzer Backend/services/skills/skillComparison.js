const { getPartialMatches } = require("./partialMatchMap");

const skillComparison = (resumeSkills, jobSkills) => {
  const resumeSet = new Set((resumeSkills || []).map((s) => s.toLowerCase()));

  const matchedSkills = new Set();
  const partialMatchedSkills = new Set();
  const missingSkills = new Set();

  for (const jobSkill of jobSkills || []) {
    const jobLower = jobSkill.toLowerCase();

    // 1️⃣ Exact match
    if (resumeSet.has(jobLower)) {
      matchedSkills.add(jobSkill);
      continue;
    }

    // 2️⃣ Partial match
    const partials = getPartialMatches(jobSkill);
    const foundPartial = partials.some((p) => resumeSet.has(p.toLowerCase()));

    if (foundPartial) {
      partialMatchedSkills.add(jobSkill);
    } else {
      missingSkills.add(jobSkill);
    }
  }

  return {
    matchedSkills: [...matchedSkills],
    partialMatchedSkills: [...partialMatchedSkills],
    missingSkills: [...missingSkills],
  };
};

module.exports = { skillComparison };
