const express = require("express");
const router = express.Router();

// user validate
const { validateUser } = require("../utils/secure");

// fetch from db
const { fetchDataFromDb } = require("../utils/db");

router.get("/", (req, res) => {
  const { what } = req.body;
  //! no user validation
  const data = fetchDataFromDb(what);
  if (data === -1) {
    res.send("Collection doesn't exist").status(200);
    return;
  }
  res.send(data).status(200);
});

router.get("/secure", (req, res) => {
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
  const data = fetchDataFromDb(what);
  if (data === -1) {
    res.send("Collection doesn't exist").status(200);
    return;
  }
  res.send(data).status(200);
});

module.exports = router;
