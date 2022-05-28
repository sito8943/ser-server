const users = require("../users/users");

const verifyBasic = (auth) => {
  const credentials = auth.split(" ")[1];
  const base64 = Buffer.from(credentials, "base64").toString();
  
  console.log(base64);
};

module.exports = {
  verifyBasic,
};
