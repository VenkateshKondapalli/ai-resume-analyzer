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

// Determine if LLM error is temporary and retriable
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

// Retry wrapper
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
        `Transient LLM error on attempt ${
          i + 1
        }/${retries}. Retrying after ${wait}ms`,
        err?.message || err
      );
      await sleep(wait);
    }
  }

  throw lastErr;
}

// Make one call to Gemini
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

  // handle direct text
  if (typeof response?.text === "string" && response.text.trim()) {
    return response.text.trim();
  }

  // try SDK structures
  const candidate = response?.candidates?.[0] || response?.output?.[0] || null;
  const textA = candidate?.content?.parts?.[0]?.text;
  const textB = candidate?.content?.[0]?.text;
  const textC = candidate?.output?.[0]?.content;
  const textD = candidate?.text;

  const generated = textA || textB || textC || textD;

  if (generated && generated.trim()) return generated.trim();

  console.error(
    "Unexpected Gemini response:",
    JSON.stringify(response, null, 2)
  );
  throw new Error("Empty or unexpected response shape from Gemini");
}

// Primary → fallback calling logic
async function callWithRetryAndFallback(prompt, opts = {}) {
  const modelPrimary = opts.model || PRIMARY_MODEL;

  try {
    return await retryWithBackoff(
      () =>
        callGeminiOnce(prompt, {
          model: modelPrimary,
          temperature: opts.temperature || 0.0,
          maxOutputTokens: opts.maxOutputTokens || MAX_OUTPUT_TOKENS,
        }),
      MAX_RETRIES,
      INITIAL_DELAY_MS
    );
  } catch (primaryErr) {
    console.warn("Primary model failed:", primaryErr?.message || primaryErr);

    if (!FALLBACK_MODEL || FALLBACK_MODEL === modelPrimary) throw primaryErr;

    try {
      const fallbackRetries = Math.max(1, Math.floor(MAX_RETRIES / 2));
      return await retryWithBackoff(
        () =>
          callGeminiOnce(prompt, {
            model: FALLBACK_MODEL,
            temperature: opts.temperature || 0.0,
            maxOutputTokens: opts.maxOutputTokens || MAX_OUTPUT_TOKENS,
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

// ---------------------
// Prompt Builders
// ---------------------

function makePrompt({ resumeText, jobDescription }) {
  return `
You are an expert resume screening assistant.

Your task is to analyze a resume against a job description and return a structured evaluation.

STRICT RULES (must follow exactly):
- Return ONLY a single valid JSON object
- Do NOT include markdown, backticks, code fences, or explanations
- Do NOT add extra keys outside the schema
- Do NOT include comments or trailing text

JSON SCHEMA:
{"match_score":number,"matched_skills":[string],"missing_skills":[string],"suggestions":string}

MATCH_SCORE RULES:
- 0 means no match at all
- 100 means perfect match
- Base the score on skills relevance and overlap only

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY the JSON object.`;
}

function makeRepairPrompt({ previousOutput, schemaHint }) {
  return `
The previous response did not match schema. Fix it.

Schema:
${schemaHint}

Incorrect JSON:
${previousOutput}

Return ONLY a corrected JSON object.
`;
}

async function buildPromptAndCallLLM({ resumeText, jobDescription }) {
  const prompt = makePrompt({ resumeText, jobDescription });

  return await callWithRetryAndFallback(prompt, {
    model: PRIMARY_MODEL,
    temperature: 0.0,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  });
}

module.exports = {
  buildPromptAndCallLLM,
  makePrompt,
  makeRepairPrompt,
};
