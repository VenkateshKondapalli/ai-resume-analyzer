const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const cors = require("cors");
const { apiRouter } = require("./api/routes");
app.use(
  cors({
    origin: [process.env.FRONTEND_URL1],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", apiRouter);

module.exports = { app };
