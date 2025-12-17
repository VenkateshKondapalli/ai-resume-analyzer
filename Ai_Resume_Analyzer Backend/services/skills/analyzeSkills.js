const { skillComparison } = require("./skillComparison");
const { extractSkillsFromText } = require("./skillExtractor");
const { computeSkillScore } = require("./skillScore");

const analyzeSkills = (resumeText = "", jobDescription = "") => {
  const rText = typeof resumeText === "string" ? resumeText : "";
  const jText = typeof jobDescription === "string" ? jobDescription : "";

  const resumeSkills = extractSkillsFromText(rText);
  const jobSkills = extractSkillsFromText(jText);

  const { matchedSkills, missingSkills } = skillComparison(
    resumeSkills,
    jobSkills
  );

  const { match_score } = computeSkillScore(matchedSkills, missingSkills);

  const skillResult = {
    resume_skills: resumeSkills,
    job_skills: jobSkills,
    matched_skills: matchedSkills,
    missing_skills: missingSkills,
    match_score,
  };

  validateSkillResult(skillResult);
  return skillResult;
};

const validateSkillResult = (result) => {
  if (typeof result.match_score !== "number") {
    throw new Error("Invalid skill result: match_score");
  }
  if (!Array.isArray(result.matched_skills)) {
    throw new Error("Invalid skill result: matched_skills");
  }
  if (!Array.isArray(result.missing_skills)) {
    throw new Error("Invalid skill result: missing_skills");
  }
};

module.exports = { analyzeSkills };
