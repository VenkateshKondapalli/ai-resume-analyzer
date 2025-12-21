const {
  getJDSkillImportance,
} = require("../rag/jdImportance/jdImportance.service");
const { resolveSkillWeights, DEFAULT_WEIGHT } = require("./weightResolver");

const { computeConfidenceLevel } = require("./confidenceScore");
const { skillComparison } = require("./skillComparison");
const { extractSkillsFromText } = require("./skillExtractor");
const { computeSkillScore } = require("./skillScore");

const analyzeSkills = (resumeText = "", jobDescription = "", options = {}) => {
  const rText = typeof resumeText === "string" ? resumeText : "";
  const jText = typeof jobDescription === "string" ? jobDescription : "";

  // 1️⃣ Extract skills
  const resumeSkills = extractSkillsFromText(rText);
  const jobSkills = extractSkillsFromText(jText);

  // 2️⃣ Compare skills (exact + partial)
  const { matchedSkills, partialMatchedSkills, missingSkills } =
    skillComparison(resumeSkills, jobSkills);

  let dynamicWeights = {};

  if (options.useDynamicWeights !== false && jText.trim()) {
    try {
      const jdImportance = getJDSkillImportance(jText);
      dynamicWeights = resolveSkillWeights(jdImportance);
    } catch (err) {
      console.warn(
        "J⚠️ JD skill importance failed, falling back to static weights"
      );
    }
  }

  // 3️⃣ Compute weighted score (exact + partial)
  const { match_score } = computeSkillScore(
    matchedSkills,
    missingSkills,
    partialMatchedSkills,
    {
      dynamicWeights,
      defaultWeight: DEFAULT_WEIGHT,
    }
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

if (require.main == module) {
  const resumeText =
    "Backend Engineer with 4 years of experience in Node.js and Express. Strong hands-on experience with MongoDB and RESTful API development. Worked extensively with Docker for containerization and CI/CD pipelines using GitHub Actions.Proficient with Git and Agile development practices.";
  const jobDescription =
    "We are hiring a Backend Engineer with strong experience in Node.js and Express. The role requires expertise in MongoDB, RESTful APIs, Docker, and CI/CD pipelines. Experience with AWS and Git is mandatory.";

  const result = analyzeSkills(resumeText, jobDescription, {
    useDynamicWeights: true,
  });
  console.log(result);
}
