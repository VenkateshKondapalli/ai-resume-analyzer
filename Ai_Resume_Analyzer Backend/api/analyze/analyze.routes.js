const express = require("express");
const multer = require("multer");
const { analyzeResume } = require("./analyze.controller");
const { generateRoadmapController } = require("./roadmap.controller");
const { getSkillKnowledgeController } = require("./skillKnowledge.controller");
const { simulateATSController } = require("./atsSimulation.controller");

const upload = multer({ dest: "uploads/" });

const analyzeRouter = express.Router();

analyzeRouter.post("/", upload.single("resume"), analyzeResume);
analyzeRouter.post("/roadmap", generateRoadmapController);
analyzeRouter.post("/skill-knowledge", getSkillKnowledgeController);
analyzeRouter.post("/ats/evaluate", simulateATSController);

module.exports = { analyzeRouter };
