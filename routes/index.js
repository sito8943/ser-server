var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req);
  res.send("Hola").status(200);
});

module.exports = router;