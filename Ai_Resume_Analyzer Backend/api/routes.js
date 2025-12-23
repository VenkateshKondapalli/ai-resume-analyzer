const express = require("express");
const { analyzeRouter } = require("./analyze/analyze.routes");
const { atsRouter } = require("./ats/ats.routes");

const apiRouter = express.Router();

apiRouter.use("/analyze", analyzeRouter);
apiRouter.use("/ats", atsRouter);

module.exports = { apiRouter };
