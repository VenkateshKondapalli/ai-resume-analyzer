const { MemoryVectorStore } = require("@langchain/classic/vectorstores/memory");
const { embeddings } = require("./embeddings");

let vectorStore = null;

async function createVectorStore(docs) {
  try {
    // Ensure we are calling the class correctly from the imported module
    vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
    console.log("✅ Vector store initialized");
    return vectorStore;
  } catch (error) {
    console.error("❌ Error creating vector store:", error);
    throw error;
  }
}

function getVectorStore() {
  if (!vectorStore) {
    throw new Error("Vector store not initialized");
  }
  return vectorStore;
}

module.exports = { createVectorStore, getVectorStore };
