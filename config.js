const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const { DB } = process.env;

module.exports = {
  DB,
};
