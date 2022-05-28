const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const fs = require("fs");
const uuid = require("node-uuid");
// middle wares
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const favicon = require("serve-favicon");

// create a write stream in append mode
/* const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log", { flags: "a" })
); */

morgan.token("id", function getId(req) {
  return req.id;
});

const assignId = (req, res, next) => {
  req.id = uuid.v4();
  next();
};

// limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message:
    "Too many accounts created from this IP, please try again after a minute",
});

// cors white list
const whitelist = ["http//localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// setup the logger
// log all requests to access.log
// app.use(morgan("combined", { stream: accessLogStream }));

// routes
const index = require("./routes/index");

const app = express();

// middle wares
// morgan
app.use(assignId);
app.use(morgan(":id :method : url : response-time"));
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.status < 400;
    },
  })
);
// helmet
app.use(helmet());
// cors
app.use(cors(corsOptions));
// limiter
app.use(limiter); //  apply to all requests
// favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", (req, res, next) => {
  console.log(req);
  res.send("hola");
});

module.exports = app;
