const buildRoadmapPrompt = ({ skill, category, role }) => {
  return `
You are a career mentor.

Generate a learning roadmap for the skill: "${skill}"
Target role: ${role}
Skill category: ${category}

Rules:
- Do NOT mention resumes or ATS
- Do NOT evaluate skill level
- Keep it beginner-friendly
- Respond in JSON ONLY with:

{
  "what_to_learn": [],
  "project_ideas": [],
  "learning_resources": []
}
`;
};

module.exports = { buildRoadmapPrompt };
