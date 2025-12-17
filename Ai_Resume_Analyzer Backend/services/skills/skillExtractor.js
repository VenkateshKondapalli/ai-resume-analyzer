const extractSkillsFromText = (text) => {
  // ---------- Guard ----------
  if (!text || typeof text !== "string") {
    return [];
  }

  // ---------- Normalize ----------
  let normalized = text.toLowerCase();

  // Remove punctuation & symbols
  normalized = normalized.replace(/[\.,\/\&\:;!?'"(){}\[\]-]/g, " ");

  // Collapse multiple spaces
  normalized = normalized.replace(/\s+/g, " ").trim();

  // ---------- Skill Dictionary ----------
  const SKILL_DICTIONARY = {
    "Node.js": ["node", "nodejs", "node js"],
    "Express.js": ["express", "express js", "expressjs"],
    MongoDB: ["mongodb", "mongo db", "mongo"],
    React: ["react", "reactjs", "react js"],
    Docker: ["docker", "containerization"],
    AWS: ["aws", "amazon web services", "s3", "ec2", "lambda"],
    Git: ["git", "github", "gitlab", "bitbucket"],
    "REST APIs": ["rest api", "rest apis", "restful"],
    TypeScript: ["typescript", "ts"],
    Python: ["python", "py"],
    "C#": ["c#", "c sharp"],
    Kubernetes: ["k8s", "kubernetes"],
    SQL: ["sql", "mysql", "postgres", "postgresql", "mariadb"],
    JavaScript: ["javascript", "js", "ecmascript"],
  };

  // ---------- Extraction ----------
  const foundSkills = new Set();

  for (const canonicalSkill of Object.keys(SKILL_DICTIONARY)) {
    const aliases = SKILL_DICTIONARY[canonicalSkill];

    for (const alias of aliases) {
      if (normalized.includes(alias)) {
        foundSkills.add(canonicalSkill);
        break;
      }
    }
  }

  return Array.from(foundSkills).sort();
};
// const test = extractSkillsFromText(null);
// console.log(test);
module.exports = { extractSkillsFromText };
