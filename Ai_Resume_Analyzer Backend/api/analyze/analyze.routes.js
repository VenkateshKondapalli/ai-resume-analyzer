const express = require("express");
const multer = require("multer");
const { analyzeResume } = require("./analyze.controller");

const upload = multer({ dest: "uploads/" });

const analyzeRouter = express.Router();

analyzeRouter.post("/", upload.single("resume"), analyzeResume);

module.exports = { analyzeRouter };
