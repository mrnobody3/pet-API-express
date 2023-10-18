const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const bookRouter = require("./routes/api/books");
const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/user");
const swaggerDocs = require("./utils/swagger");

const app = express();
const { PORT = 4000 } = process.env;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json(null);
});

app.use("/api/books", bookRouter);

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

swaggerDocs(app, PORT);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
