const { loadAwsDocs } = require("./ingest/loadDocs");
const { createVectorStore } = require("./vectorStore");
const { getSkillsContext } = require("./retriever");
const { buildRagPrompt } = require("./prompt");
const { callLLMWithPrompt } = require("../llmService");

async function initRag() {
  const docs = loadAwsDocs();
  await createVectorStore(docs);
}

async function runSkillRag(skill) {
  const docs = await getSkillsContext(skill);
  const context = docs.map((d) => d.pageContent).join("\n");
  const prompt = buildRagPrompt({ skill, context });
  return await callLLMWithPrompt(prompt);
}

module.exports = { initRag, runSkillRag };
