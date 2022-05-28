const dotenv = require("dotenv");
// const assert = require("assert");

dotenv.config();

const { user, url } = process.env;

module.exports = {
  USER: user,
  URL: url,
};
