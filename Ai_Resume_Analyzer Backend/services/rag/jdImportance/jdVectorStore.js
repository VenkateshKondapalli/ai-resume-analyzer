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

if (require.main === module) {
  (async () => {
    try {
      const store = await initJDVectorStore();
      const results = await store.similaritySearch(
        "Looking for a backend developer with AWS and Node.js experience",
        2
      );

      console.log("\n🔍 Sample JD Retrieval:");
      results.forEach((doc, i) => {
        console.log(`\nResult ${i + 1}:`);
        console.log("Role:", doc.metadata.role);
        console.log("Content Preview:", doc.pageContent.slice(0, 200), "...");
      });
    } catch (err) {
      console.error(err);
    }
  })();
}
