const express = require("express");
const { simulateATSController } = require("./atsSimulation.controller");

const atsRouter = express.Router();

atsRouter.post("/simulate", simulateATSController);

module.exports = { atsRouter };
