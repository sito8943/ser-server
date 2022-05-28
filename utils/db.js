// users
const db = require("../files/user.json");

const fetchDataFromDb = (what) => {
  const data = db[what];
  if (data) return data;
  return -1;
};

module.exports = {
  fetchDataFromDb,
};
