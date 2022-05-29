const express = require("express");

// chalk
const { log, info, good } = require("../utils/chalk");

// auth
const { verifyBasic } = require("../utils/secure");

// pages
const { notFound } = require("../utils/pages");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.headers.authorization) {
    const verified = verifyBasic(req.headers.authorization);
    if (verified) {
      log(`${info("Logged as ")}${good(verified)}`);
      res.send(`Logged as ${verified}`).status(200);
      return;
    }
  }
  res.send(notFound(req.baseUrl)).status(404);
});

module.exports = router;
