const { retrieveSimilarJDs } = require("./jdRetriever");
const { analyzeJDSkillImportance } = require("./jdSkillAnalyzer");

async function getJDSkillImportance(jobDescription, options = {}) {
  if (!jobDescription || typeof jobDescription !== "string") {
    throw new Error("Job description is required for JD skill importance");
  }
  const limit = options.limit || 5;
  const similarJDs = await retrieveSimilarJDs(jobDescription, limit);

  const importance = analyzeJDSkillImportance(similarJDs);
  return {
    total_similar_jds: similarJDs.length,
    ...importance,
  };
}

module.exports = { getJDSkillImportance };
