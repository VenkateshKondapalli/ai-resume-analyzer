const { callLLMWithPrompt } = require("../llmService");

function extractJson(text) {
  return text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();
}

async function generateSkillRoadmap(prompt) {
  const raw = await callLLMWithPrompt(prompt);

  const cleaned = extractJson(raw);

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ Invalid JSON from LLM:");
    console.error(cleaned);
    throw new Error("LLM returned invalid JSON");
  }
}

module.exports = { generateSkillRoadmap };
