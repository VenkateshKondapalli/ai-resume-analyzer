const fs = require("fs");
const pdfParse = require("pdf-parse");

const MAX_CHARS = 18000;

async function extractResumeText(reqFile, resumeTextFromBody) {
  if (resumeTextFromBody) {
    return resumeTextFromBody.length > MAX_CHARS
      ? resumeTextFromBody.slice(0, MAX_CHARS) + "\n...[truncated]"
      : resumeTextFromBody;
  }

  if (!reqFile) return "";

  const buffer = fs.readFileSync(reqFile.path);
  const data = await pdfParse(buffer);
  const text = data.text || "";

  try {
    fs.unlinkSync(reqFile.path);
  } catch {}

  return text.length > MAX_CHARS
    ? text.slice(0, MAX_CHARS) + "\n...[truncated]"
    : text;
}

module.exports = { extractResumeText };
