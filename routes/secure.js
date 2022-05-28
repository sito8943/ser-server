const express = require("express");
const basicAuth = require("express-basic-auth");

// auth
const { verifyBasic } = require("../utils/secure");

const router = express.Router();

// router.use(basicAuth({ users, unauthorizedResponse }));

router.get("/", (req, res, next) => {
  console.log(req.headers);
  const v = verifyBasic(req.headers.authorization);
  res.send("Hola").status(200);
  next();
});

module.exports = router;
