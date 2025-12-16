const skillComparison = (resumeSkills, jobSkills) => {
  const emptyResult = {
    matchedSkills: [],
    missingSkills: [],
  };

  const cleanResumeSkills = Array.isArray(resumeSkills) ? resumeSkills : [];
  const cleanJobSkills = Array.isArray(jobSkills) ? jobSkills : [];

  if (cleanResumeSkills.length === 0 && cleanJobSkills.length === 0) {
    return emptyResult;
  }

  const resumeSet = new Set(cleanResumeSkills.map((s) => s.toLowerCase()));

  const matchedSkillsSet = new Set();
  const missingSkillsSet = new Set();

  for (const jobSkill of cleanJobSkills) {
    const lowerJobSkill = jobSkill.toLowerCase();
    if (resumeSet.has(lowerJobSkill)) {
      matchedSkillsSet.add(jobSkill);
    } else {
      missingSkillsSet.add(jobSkill);
    }
  }

  return {
    matchedSkills: Array.from(matchedSkillsSet).sort(),
    missingSkills: Array.from(missingSkillsSet).sort(),
  };
};

module.exports = { skillComparison };
