const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// routes
const router = require("./routes/mongo");

const app = express();

app.use(cors());
app.options(
  "/file",
  cors({ origin: "http://localhost:3000", methods: "GET", credentials: true })
); // include before other routes
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", router);

module.exports = app;
