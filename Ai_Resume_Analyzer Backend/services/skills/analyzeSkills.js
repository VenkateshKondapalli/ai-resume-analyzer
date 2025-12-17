const { computeConfidenceLevel } = require("./confidenceScore");
const { skillComparison } = require("./skillComparison");
const { extractSkillsFromText } = require("./skillExtractor");
const { computeSkillScore } = require("./skillScore");

const analyzeSkills = (resumeText = "", jobDescription = "") => {
  const rText = typeof resumeText === "string" ? resumeText : "";
  const jText = typeof jobDescription === "string" ? jobDescription : "";

  // 1️⃣ Extract skills
  const resumeSkills = extractSkillsFromText(rText);
  const jobSkills = extractSkillsFromText(jText);

  // 2️⃣ Compare skills (exact + partial)
  const { matchedSkills, partialMatchedSkills, missingSkills } =
    skillComparison(resumeSkills, jobSkills);

  // 3️⃣ Compute weighted score (exact + partial)
  const { match_score } = computeSkillScore(
    matchedSkills,
    missingSkills,
    partialMatchedSkills
  );

  const confidence_level = computeConfidenceLevel({
    match_score,
    missing_skills: missingSkills,
  });

  // 4️⃣ Canonical result
  const skillResult = {
    resume_skills: resumeSkills,
    job_skills: jobSkills,
    matched_skills: matchedSkills,
    partial_matched_skills: partialMatchedSkills,
    missing_skills: missingSkills,
    match_score,
    confidence_level,
  };

  // 5️⃣ Validate once (defensive)
  validateSkillResult(skillResult);

  return skillResult;
};

/**
 * Defensive validation for Phase 4.2 result
 */
const validateSkillResult = (result) => {
  if (typeof result.match_score !== "number") {
    throw new Error("Invalid skill result: match_score");
  }
  if (!Array.isArray(result.matched_skills)) {
    throw new Error("Invalid skill result: matched_skills");
  }
  if (!Array.isArray(result.partial_matched_skills)) {
    throw new Error("Invalid skill result: partial_matched_skills");
  }
  if (!Array.isArray(result.missing_skills)) {
    throw new Error("Invalid skill result: missing_skills");
  }
};

module.exports = { analyzeSkills };

const test = analyzeSkills(
  "Experienced backend developer with strong knowledge of Node.js and Express.js.Worked extensively with MongoDB and RESTful APIs.Built scalable applications using containerization and cloud services.Comfortable with JavaScript and Git-based workflows.",
  "We are looking for a Backend Engineer with experience in Node.js, Express.js,JavaScript, MongoDB, Docker, REST APIs, and AWS."
);

console.log(test);
