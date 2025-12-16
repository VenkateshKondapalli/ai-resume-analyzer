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

  const scoringResult = computeSkillScore(matchedSkills, missingSkills);

  return {
    resumeSkills,
    jobSkills,
    matchedSkills,
    missingSkills,
    ...scoringResult,
  };
};

module.exports = { analyzeSkills };
