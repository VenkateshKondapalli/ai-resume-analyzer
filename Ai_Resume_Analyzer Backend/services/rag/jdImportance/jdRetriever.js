const { loadJdDatasets } = require("./jdIngest");

const USE_EMBEDDINGS = false;

function normalize(text = "") {
  return (
    text
      .toLowerCase()

      // Replace slashes and hyphens with space
      .replace(/[\/\-]/g, " ")

      // Remove punctuation except . and +
      .replace(/[^a-z0-9.+\s]/g, " ")

      // Normalize whitespace
      .replace(/\s+/g, " ")

      .trim()
  );
}

function mockRetrieveSimilarJDs(jobDescription, limit = 5) {
  const allJDs = loadJdDatasets();
  const jdText = normalize(jobDescription);

  return allJDs
    .map((doc) => {
      const content = normalize(doc.pageContent);
      let score = 0;

      jdText.split(" ").forEach((word) => {
        if (word.length > 2 && content.includes(word)) {
          score += 1;
        }
      });

      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.doc);
}

async function retrieveSimilarJDs(jobDescription, limit = 5) {
  if (!jobDescription || typeof jobDescription !== "string") {
    throw new Error("Job description must be a non-empty string");
  }

  if (!USE_EMBEDDINGS) {
    return mockRetrieveSimilarJDs(jobDescription, limit);
  }

  const { initJDVectorStore } = require("./jdVectorStore");
  const store = await initJDVectorStore();

  return store.similaritySearch(jobDescription, limit);
}

module.exports = {
  retrieveSimilarJDs,
};
