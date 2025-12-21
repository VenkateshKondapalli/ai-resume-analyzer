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

if (require.main === module) {
  (async () => {
    try {
      await initRag();
      const result = await runSkillRag("AWS");
      console.log("\n✅ RAG OUTPUT:\n", result);
    } catch (err) {
      console.error("❌ RAG ERROR:", err);
    } finally {
      process.exit(0);
    }
  })();
}

module.exports = { initRag, runSkillRag };
