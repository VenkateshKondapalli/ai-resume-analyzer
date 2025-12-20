function buildRagPrompt({ skill, context }) {
  return `
You are a career advisor.

Skill: ${skill}

Context (trusted data):
${context}

Rules:
- Use ONLY the provided context
- Do NOT hallucinate
- Respond in JSON only

{
  "real_world_expectations": [],
  "common_tools": [],
  "project_examples": []
}
`;
}

module.exports = { buildRagPrompt };
