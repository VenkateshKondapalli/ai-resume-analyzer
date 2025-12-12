const { z } = require("zod");

const ResponseSchema = z.object({
  match_score: z.number().min(0).max(100),
  matched_skills: z.array(z.string()),
  missing_skills: z.array(z.string()),
  suggestions: z.string(),
});

const SKILL_NORMALIZE = {
  node: "Node.js",
  "node.js": "Node.js",
  mongodb: "MongoDB",
  react: "React",
  reactjs: "React",
  js: "JavaScript",
  javascript: "JavaScript",
};

function normalizeSkill(s) {
  if (!s) return s;
  const sClean = s.trim().toLowerCase();
  return SKILL_NORMALIZE[sClean] || s.trim();
}

function parseLLMJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}$/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Invalid JSON from LLM");
  }
}

function computeServerScore(matchedSkills = [], missingSkills = []) {
  const total = matchedSkills.length + missingSkills.length;
  if (total === 0) return 0;
  return Math.round((matchedSkills.length / total) * 100);
}

module.exports = {
  ResponseSchema,
  normalizeSkill,
  parseLLMJson,
  computeServerScore,
};
