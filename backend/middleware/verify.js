const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    bear = req.headers.authentication;

    const decoded = await jwt.verify(bear, process.env.SECRET_KEY);
    console.log(decoded);
    const id = decoded.id;
    if (id) {
      req.user = id;

      next();
    } else {
      return res.status(401).json({
        message: "your not you are not authorized user",
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(404)
      .json({ message: "account not found", success: false });
  }
};
