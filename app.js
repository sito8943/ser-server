const express = require("express");
const path = require("path");

const { helmet, cors, limiter, favicon, morgan } = require("./utils/middlewares");

// routes
const index = require("./routes/index");
const secure = require("./routes/secure");

const app = express();

// middle wares
// morgan
app.use(morgan.assignId);
app.use(morgan.structure);
app.use(morgan.dev);
// helmet
app.use(helmet);
// cors
app.use(cors);
// limiter
app.use(limiter); //  apply to all requests
// favicon
app.use(favicon);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", index);
app.use("/secure/", secure);

module.exports = app;
