// utils/prompt.js
const dotenv = require("dotenv");
dotenv.config();

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({});

function makePrompt({ resumeText, jobDescription }) {
  return `
You are an expert resume screening assistant.
Return ONLY valid JSON exactly in this schema (no extra properties, no explanation, no markdown):
{"match_score":number,"matched_skills":[string],"missing_skills":[string],"suggestions":string}

EXAMPLES:
RESUME: "Node dev with Express, MongoDB."
JOB: "Backend: Node, MongoDB, Docker."
OUTPUT:
{"match_score":85,"matched_skills":["Node.js","MongoDB"],"missing_skills":["Docker"],"suggestions":"Add Docker project."}

RESUME: "Frontend React dev with some Node experience."
JOB: "Fullstack engineer with React and Node"
OUTPUT:
{"match_score":70,"matched_skills":["React","Node.js"],"missing_skills":["Backend design"],"suggestions":"Add backend project"}

---- Now analyze the following and return ONLY the JSON object (no explanation):

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
  `;
}

function makeRepairPrompt({ previousOutput, schemaHint }) {
  // schemaHint is a short restatement of the expected schema or an example
  return `
The previous response did not validate. You MUST return ONLY a single JSON object that matches this schema exactly (no extra properties, no explanation):

${schemaHint}

Here is the previous output (possibly malformed). Fix it and return only valid JSON that conforms exactly to the schema:

${previousOutput}
  `;
}

async function withRetries(fn, retries = 3, delay = 600) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      const wait = delay * Math.pow(2, i);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

async function callGemini(prompt, opts = {}) {
  // opts: { model, temperature, maxOutputTokens }
  const model = opts.model || "gemini-2.5-flash";
  const temperature =
    typeof opts.temperature === "number" ? opts.temperature : 0.0;
  const maxOutputTokens = opts.maxOutputTokens || 1024;

  const call = async () => {
    const response = await ai.models.generateContent({
      model,
      // For genai SDK we pass contents structure
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      temperature,
      maxOutputTokens,
    });

    // Try multiple response shapes
    // 1) top-level text
    if (typeof response?.text === "string" && response.text.trim())
      return response.text.trim();

    // 2) candidates
    const candidate =
      response?.candidates?.[0] || response?.output?.[0] || null;
    const textA = candidate?.content?.parts?.[0]?.text;
    const textB = candidate?.content?.[0]?.text;
    const textC = candidate?.output?.[0]?.content;
    const textD = candidate?.text;
    const generated = textA || textB || textC || textD || null;

    if (generated && typeof generated === "string" && generated.trim())
      return generated.trim();

    // fallback: stringify response for debugging
    console.error(
      "Raw Gemini response (unexpected shape):",
      JSON.stringify(response, null, 2)
    );
    throw new Error("Empty or unexpected response shape from Gemini");
  };

  return await withRetries(call, 3, 600);
}

const buildPromptAndCallLLM = async ({ resumeText, jobDescription }) => {
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    // The SDK will usually read env, but we still warn if not present
    console.warn(
      "GEMINI_API_KEY / GOOGLE_API_KEY not found in env (SDK may still work if configured differently)."
    );
  }

  const prompt = makePrompt({ resumeText, jobDescription });
  const generated = await callGemini(prompt, {
    temperature: 0.0,
    maxOutputTokens: 1600,
    model: "gemini-2.5-flash",
  });
  return generated;
};

module.exports = { buildPromptAndCallLLM, makeRepairPrompt };
