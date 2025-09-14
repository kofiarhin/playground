const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

// setupt middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", async (req, res, next) => {
  return res.json({ message: "hello world" });
});

app.get("/api/health", async (req, res, next) => {
  return res.json({ message: "server is working" });
});

app.post("/api/health", async (req, res, next) => {
  return res.json({ message: "server is working" });
});

module.exports = app;
