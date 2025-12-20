const dotenv = require("dotenv");
dotenv.config();

const { OpenAIEmbeddings } = require("@langchain/openai");

if (!process.env.OPENAI_API_KEY) {
  throw new Error("❌ OPENAI_API_KEY is missing");
}

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-small",
});

module.exports = { embeddings };
