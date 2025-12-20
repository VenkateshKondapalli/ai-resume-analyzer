const fs = require("fs");
const path = require("path");
const { Document } = require("@langchain/core/documents");

function loadAwsDocs() {
  const filePath = path.resolve(
    __dirname,
    "../../../data/rag/aws/aws_context.txt"
  );

  console.log("📄 Resolved AWS file path:", filePath);

  const content = fs.readFileSync(filePath, "utf-8");

  return [
    new Document({
      pageContent: content,
      metadata: { skill: "AWS" },
    }),
  ];
}

module.exports = { loadAwsDocs };
