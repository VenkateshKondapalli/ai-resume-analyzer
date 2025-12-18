const dotenv = require("dotenv");
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY is missing in .env");
}

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PRIMARY_MODEL = process.env.GENAI_PRIMARY_MODEL || "gemini-2.5-flash";
const FALLBACK_MODEL = process.env.GENAI_FALLBACK_MODEL || "";
const MAX_RETRIES = Number(process.env.GENAI_MAX_RETRIES || 3);
const INITIAL_DELAY_MS = Number(process.env.GENAI_INITIAL_DELAY_MS || 600);
const MAX_OUTPUT_TOKENS = Number(process.env.GENAI_MAX_OUTPUT_TOKENS || 1600);

// ---------------------
// Utils
// ---------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = (delay) => delay + Math.floor(Math.random() * delay * 0.2);

function isTransientError(err) {
  const status = err?.status || err?.response?.status || err?.code;
  if (status === 429 || status === 503) return true;

  const msg = String(err?.message || "").toLowerCase();
  return (
    msg.includes("overload") ||
    msg.includes("rate limit") ||
    msg.includes("timeout") ||
    ["ECONNRESET", "ECONNABORTED", "ENOTFOUND"].includes(err?.code)
  );
}

async function retryWithBackoff(fn) {
  let lastErr;
  for (let i = 0; i <= MAX_RETRIES; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (!isTransientError(err) || i === MAX_RETRIES) break;
      await sleep(jitter(INITIAL_DELAY_MS * Math.pow(2, i)));
    }
  }
  throw lastErr;
}

// ---------------------
// Core Gemini Call
// ---------------------
async function callGeminiOnce(prompt, { model, temperature, maxOutputTokens }) {
  const response = await ai.models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    temperature,
    maxOutputTokens,
  });

  const text =
    response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("Empty response from Gemini");
  return text.trim();
}

async function callWithRetryAndFallback(prompt, opts = {}) {
  try {
    return await retryWithBackoff(() =>
      callGeminiOnce(prompt, {
        model: opts.model || PRIMARY_MODEL,
        temperature: opts.temperature ?? 0.0,
        maxOutputTokens: opts.maxOutputTokens || MAX_OUTPUT_TOKENS,
      })
    );
  } catch (err) {
    if (!FALLBACK_MODEL) throw err;

    return await retryWithBackoff(() =>
      callGeminiOnce(prompt, {
        model: FALLBACK_MODEL,
        temperature: opts.temperature ?? 0.0,
        maxOutputTokens: opts.maxOutputTokens || MAX_OUTPUT_TOKENS,
      })
    );
  }
}

// ======================================================
// PHASE 2 — Resume Analysis (JSON, STRUCTURED)
// ======================================================
function makePrompt({ resumeText, jobDescription }) {
  return `
Return ONLY valid JSON.

Schema:
{"match_score":number,"matched_skills":[string],"missing_skills":[string],"suggestions":string}

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`;
}

async function buildPromptAndCallLLM({ resumeText, jobDescription }) {
  console.log("❌ buildPromptAndCallLLM USED");
  const prompt = makePrompt({ resumeText, jobDescription });
  return await callWithRetryAndFallback(prompt, {
    temperature: 0.0,
  });
}

// ======================================================
// PHASE 4+ — Explanation Only (PLAIN TEXT)
// ======================================================
async function callLLMWithPrompt(prompt) {
  console.log("🔥 callLLMWithPrompt USED");
  return await callWithRetryAndFallback(prompt, {
    temperature: 0.2,
  });
}

module.exports = {
  buildPromptAndCallLLM, // Phase 2
  callLLMWithPrompt, // Phase 4+
};
