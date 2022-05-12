const unauthorizedResponse = (req) => {
  return req.auth
    ? `Credentials ${req.auth.user}:${req.auth.password} rejected`
    : "Access denied";
};

module.exports = {
  unauthorizedResponse,
};
