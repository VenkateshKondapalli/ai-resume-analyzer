const fs = require("fs");
const path = require("path");
const { Document } = require("@langchain/core/documents");

function loadJdDatasets() {
  const datasetFiles = [
    { name: "backend_jds.txt", role: "backend" },
    { name: "fullstack_jds.txt", role: "fullstack" },
    { name: "cloud_backend_jds.txt", role: "cloud_backend" },
  ];

  let allDocuments = [];
  datasetFiles.forEach((fileInfo) => {
    const filePath = path.resolve(
      __dirname,
      "../../../data/rag/jd",
      fileInfo.name
    );

    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");

        const individualJds = content.split(/\n\n+/);

        const docs = individualJds
          .filter((jd) => jd.trim().length > 0)
          .map((jd) => {
            return new Document({
              pageContent: jd.trim(),
              metadata: {
                role: fileInfo.role,
                source: "jd-dataset",
                fileName: fileInfo.name,
              },
            });
          });
        allDocuments = [...allDocuments, ...docs];
        // console.log(`✅ Loaded ${docs.length} JDs from ${fileInfo.name}`);
      } else {
        console.warn(`⚠️ Warning: File not found at ${filePath}`);
      }
    } catch (err) {
      console.error(`❌ Error reading ${fileInfo.name}:`, err.message);
    }
  });
  return allDocuments;
}

module.exports = { loadJdDatasets };
