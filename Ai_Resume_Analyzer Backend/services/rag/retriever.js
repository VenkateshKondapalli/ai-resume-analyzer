const { getVectorStore } = require("./vectorStore");

function getSkillsContext(skill) {
  const store = getVectorStore();
  return store.similaritySearch(skill, 4);
}

module.exports = { getSkillsContext };
