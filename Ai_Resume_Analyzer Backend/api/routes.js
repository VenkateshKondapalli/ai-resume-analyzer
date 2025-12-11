const express = require("express");
const { analyzeRouter } = require("./analyze/analyze.routes");

const apiRouter = express.Router();

apiRouter.use("/analyze", analyzeRouter);

module.exports = { apiRouter };
