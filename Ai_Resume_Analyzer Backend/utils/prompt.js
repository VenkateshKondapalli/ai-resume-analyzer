// utils/prompt.js
const dotenv = require("dotenv");
dotenv.config();

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({});

const PRIMARY_MODEL = process.env.GENAI_PRIMARY_MODEL || "gemini-2.5-flash";
const FALLBACK_MODEL = process.env.GENAI_FALLBACK_MODEL || "";
const MAX_RETRIES = Number(process.env.GENAI_MAX_RETRIES || 3);
const INITIAL_DELAY_MS = Number(process.env.GENAI_INITIAL_DELAY_MS || 600);
const MAX_OUTPUT_TOKENS = Number(process.env.GENAI_MAX_OUTPUT_TOKENS || 1600);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function jitter(delay) {
  return delay + Math.floor(Math.random() * Math.floor(delay * 0.2));
}

// Decide whether an error is transient and worth retrying.
// This inspects common shapes from SDK/network errors.
function isTransientError(err) {
  if (!err) return false;
  const status = err?.status || err?.response?.status || err?.code;
  if (status === 429 || status === 503) return true;
  const msg = String(err?.message || "").toLowerCase();
  if (
    msg.includes("overload") ||
    msg.includes("rate limit") ||
    msg.includes("timed out")
  )
    return true;
  if (
    err?.code === "ECONNABORTED" ||
    err?.code === "ECONNRESET" ||
    err?.code === "ENOTFOUND"
  )
    return true;
  return false;
}

// Generic retry-with-backoff + jitter. Retries only on thrown errors.

async function retryWithBackoff(
  fn,
  retries = MAX_RETRIES,
  base = INITIAL_DELAY_MS
) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (!isTransientError(err)) throw err;
      if (i === retries) break;
      const wait = jitter(base * Math.pow(2, i));
      console.warn(
        `Transient error on attempt ${
          i + 1
        }/${retries} — retrying after ${wait}ms`,
        err?.message || err
      );
      await sleep(wait);
    }
  }
  throw lastErr;
}

async function callGeminiOnce(
  prompt,
  { model, temperature = 0.0, maxOutputTokens = MAX_OUTPUT_TOKENS } = {}
) {
  const response = await ai.models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    temperature,
    maxOutputTokens,
  });

  // 1) top-level text
  if (typeof response?.text === "string" && response.text.trim())
    return response.text.trim();

  // 2) candidate shapes used by SDK
  const candidate = response?.candidates?.[0] || response?.output?.[0] || null;
  const textA = candidate?.content?.parts?.[0]?.text;
  const textB = candidate?.content?.[0]?.text;
  const textC = candidate?.output?.[0]?.content;
  const textD = candidate?.text;
  const generated = textA || textB || textC || textD || null;

  if (generated && typeof generated === "string" && generated.trim())
    return generated.trim();

  // Fallback: stringify for debugging
  console.error(
    "Raw Gemini response (unexpected shape):",
    JSON.stringify(response, null, 2)
  );
  throw new Error("Empty or unexpected response shape from Gemini");
}

// Call primary model with retries; if that fails and a fallback model is configured, try fallback.
async function callWithRetryAndFallback(prompt, opts = {}) {
  const modelPrimary = opts.model || PRIMARY_MODEL;
  const temperature =
    typeof opts.temperature === "number" ? opts.temperature : 0.0;
  const maxOutputTokens = opts.maxOutputTokens || MAX_OUTPUT_TOKENS;

  // Try primary model with retries and backoff
  try {
    return await retryWithBackoff(
      () =>
        callGeminiOnce(prompt, {
          model: modelPrimary,
          temperature,
          maxOutputTokens,
        }),
      MAX_RETRIES,
      INITIAL_DELAY_MS
    );
  } catch (primaryErr) {
    console.warn(
      "Primary model failed after retries:",
      primaryErr?.message || primaryErr
    );

    // If no fallback configured, bubble primary error
    if (!FALLBACK_MODEL || FALLBACK_MODEL === modelPrimary) throw primaryErr;

    // Try fallback with fewer retries
    try {
      const fallbackRetries = Math.max(1, Math.floor(MAX_RETRIES / 2));
      return await retryWithBackoff(
        () =>
          callGeminiOnce(prompt, {
            model: FALLBACK_MODEL,
            temperature,
            maxOutputTokens,
          }),
        fallbackRetries,
        INITIAL_DELAY_MS
      );
    } catch (fallbackErr) {
      console.error(
        "Fallback model also failed:",
        fallbackErr?.message || fallbackErr
      );
      const err = new Error("Both primary and fallback LLM calls failed");
      err.primary = primaryErr;
      err.fallback = fallbackErr;
      throw err;
    }
  }
}

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
  return `
The previous response did not validate. You MUST return ONLY a single JSON object that matches this schema exactly (no extra properties, no explanation):

${schemaHint}

Here is the previous output (possibly malformed). Fix it and return only valid JSON that conforms exactly to the schema:

${previousOutput}
  `;
}

const buildPromptAndCallLLM = async ({ resumeText, jobDescription }) => {
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    console.warn(
      "GEMINI_API_KEY / GOOGLE_API_KEY not found in env (SDK may still work if configured differently)."
    );
  }

  const prompt = makePrompt({ resumeText, jobDescription });

  // Call with retry + fallback
  const generated = await callWithRetryAndFallback(prompt, {
    model: PRIMARY_MODEL,
    temperature: 0.0,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  });

  return generated;
};

module.exports = { buildPromptAndCallLLM, makeRepairPrompt };
