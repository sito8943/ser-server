const { users } = require("../users/users");

const verifyBasic = (auth) => {
  const credentials = auth.split(" ")[1];
  const base64 = Buffer.from(credentials, "base64").toString();

  const [user, pwd] = base64.split(":");
  let ok = false;
  Object.keys(users).forEach((item) => {
    if (user === item && pwd === users[item]) ok = user;
  });
  return ok;
};

module.exports = {
  verifyBasic,
};
