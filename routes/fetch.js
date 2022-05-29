const express = require("express");
const router = express.Router();

// chalk
const { log, info } = require("../utils/chalk");

// user validate
const { validateUser } = require("../utils/secure");

// fetch from db
const { fetchDataFromDb, fetchDataTypes } = require("../utils/db");

router.get("/fetch", (req, res) => {
  const { what } = req.query;
  //! no user validation
  const data = fetchDataFromDb(what, "not-secure");
  if (data === -1) {
    res.send("Collection doesn't exist").status(200);
    return;
  }
  res.send(data).status(200);
  log(info(`unknown has fetched ${what}`));
});

router.get("/all", (req, res) => {
  //! no user validation
  res.send(fetchDataTypes("not-secure")).status(200);
  log(info("unknown has fetched all data types"));
});

//! secure fetches

router.post("/secure/all", (req, res) => {
  //! user validation
  const verified = validateUser(user, pwd);
  // user doesn't exist
  if (verified === -1) {
    res.send("User doesn't exist").status(200);
    return;
  }
  if (verified === 0) {
    res.send("Wrong password").status(200);
    return;
  }
  const data = fetchDataFromDb(what, "secure");
  if (data === -1) {
    res.send("Collection doesn't exist").status(200);
    return;
  }
  //! no user validation
  res.send(fetchDataTypes()).status(200);
  log(info(`${user}`));
});

router.get("/secure/fetch", (req, res) => {
  const { user, pwd, what } = req.body;
  //! user validation
  const verified = validateUser(user, pwd);
  // user doesn't exist
  if (verified === -1) {
    res.send("User doesn't exist").status(200);
    return;
  }
  if (verified === 0) {
    res.send("Wrong password").status(200);
    return;
  }
  const data = fetchDataFromDb(what, "secure");
  if (data === -1) {
    res.send("Collection doesn't exist").status(200);
    return;
  }
  res.send(data).status(200);
});

module.exports = router;
