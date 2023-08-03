const Token = require("../models/Token");

module.exports = () => {
  return (req, res, next) => {
    const UserData = Token.userToken();
    const token = req.body.token || req.query.token || req.headers["token"];

    if (!token) {
      return res.status(401).send("Unauthorized");
    } else {
      if (UserData.some((user) => user.token === token)) {
        next();
      } else {
        return res.status(401).send("Unauthorized");
      }
    }
  };
};
