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

function parseLLMJson(llmText) {
  if (!llmText || typeof llmText !== "string")
    throw new Error("Empty LLM output");

  let cleaned = llmText.trim();

  // Strip triple code fences (``` or ~~~) and optional language tag (e.g., json)
  if (
    (cleaned.startsWith("```") && cleaned.endsWith("```")) ||
    (cleaned.startsWith("~~~") && cleaned.endsWith("~~~"))
  ) {
    const firstBreak = cleaned.indexOf("\n");
    if (firstBreak !== -1 && cleaned.slice(0, firstBreak).match(/^(```|~~~)/)) {
      cleaned = cleaned.slice(firstBreak + 1, cleaned.length - 3).trim();
    } else {
      cleaned = cleaned
        .replace(/^(```|~~~)/, "")
        .replace(/(```|~~~)$/, "")
        .trim();
    }
  }

  // Remove single backticks
  if (cleaned.startsWith("`") && cleaned.endsWith("`")) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  // Quick try: parse directly if clean
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Continue to brace counting if direct parse fails
  }

  // Find first balanced JSON object using brace counting
  const start = cleaned.indexOf("{");
  if (start === -1) throw new Error("No JSON object found in LLM output");

  let depth = 0;
  let inString = false;
  let escapeNext = false;
  let endIndex = -1;

  for (let i = start; i < cleaned.length; i++) {
    const ch = cleaned[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (ch === "\\") {
      escapeNext = true;
      continue;
    }

    // String detection handling single/double quotes
    if (ch === '"' || ch === "'") {
      if (!inString) inString = ch;
      else if (inString === ch) inString = false;
      continue;
    }
    if (inString) continue;

    // Brace counting for object boundaries
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (endIndex === -1)
    throw new Error("Could not find balanced JSON object in LLM output");

  const jsonSubstr = cleaned.slice(start, endIndex + 1);
  try {
    return JSON.parse(jsonSubstr);
  } catch (parseErr) {
    throw new Error(
      `Invalid JSON from LLM (extracted snippet): ${parseErr.message}`
    );
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
