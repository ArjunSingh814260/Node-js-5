const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
tokenGenrator = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
};

module.exports = tokenGenrator;
