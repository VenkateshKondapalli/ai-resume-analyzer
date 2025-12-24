const { MemoryVectorStore } = require("@langchain/classic/vectorstores/memory");
const { loadJdDatasets } = require("./jdIngest");
const { embeddings } = require("../embeddings");

let jdVectorStore = null;

async function initJDVectorStore() {
  if (jdVectorStore) {
    return jdVectorStore;
  }

  console.log("📦 Initializing JD Vector Store...");

  const jdDocuments = loadJdDatasets();

  if (!jdDocuments.length) {
    throw new Error("❌ No JD documents found for Phase 6.2");
  }

  jdVectorStore = await MemoryVectorStore.fromDocuments(
    jdDocuments,
    embeddings
  );

  console.log(`✅ JD Vector Store ready with ${jdDocuments.length} documents`);

  return jdDocuments;
}

function getJDVectorStore() {
  if (!jdVectorStore) {
    throw new Error(
      "❌ JD Vector Store not initialized. Call initJDVectorStore() first"
    );
  }
  return jdVectorStore;
}

module.exports = { getJDVectorStore, initJDVectorStore };
