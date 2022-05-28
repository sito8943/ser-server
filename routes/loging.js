var express = require("express");
var router = express.Router();

// user validate
const { validateUser } = require("../utils/secure");

/* GET home page. */
router.post("/login-cookies", function (req, res, next) {
  res.send("Hola").status(200);
});

/* GET home page. */
router.post("/login", function (req, res, next) {
  const { user, pwd } = req.body;
  //! no form validation
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
  res.send(`Welcome ${user}`).status(200);
});

module.exports = router;
