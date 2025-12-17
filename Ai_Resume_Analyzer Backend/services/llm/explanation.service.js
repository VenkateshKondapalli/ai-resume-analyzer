// const { buildPromptAndCallLLM } = require("../llmService");

const { callLLMWithPrompt } = require("../llmService");

const buildExplanationPrompt = ({
  match_score,
  matched_skills,
  missing_skills,
}) => {
  const safeMatched = Array.isArray(matched_skills) ? matched_skills : [];
  const safeMissing = Array.isArray(missing_skills) ? missing_skills : [];

  return `
You are an AI career assistant.

Rules:
- Do NOT calculate scores.
- Do NOT add or remove skills.
- Do NOT contradict the data.

Skill Analysis (source of truth):
- Match Score: ${match_score}%
- Matched Skills: ${safeMatched.join(", ") || "None"}
- Missing Skills: ${safeMissing.join(", ") || "None"}

Tasks:
1. Explain why the match score is ${match_score}%
2. Highlight strengths based on matched skills
3. Explain gaps caused by missing skills
4. Give actionable advice to improve the score

Return a concise, professional explanation in plain text.
`;
};

const generateExplanation = async (skillResult) => {
  console.log("🟢 generateExplanation called");
  try {
    const prompt = buildExplanationPrompt(skillResult);
    console.log("🟢 Explanation prompt:\n", prompt);
    const response = await callLLMWithPrompt(prompt);
    return response;
  } catch (err) {
    console.error("LLM explanation failed:", err.message);
    return null;
  }
};

module.exports = { generateExplanation };
