const jwt = require("jsonwebtoken");
const { customErrorHander } = require("../errors/customError");
const JWT_SECRET = process.env.JWT_SECRET_STRING;

const fetchUser = (req, res, next) => {
  try {
  const token = req.header("auth-token");
  if (!token) {
   return next(customErrorHander("Please autheticate with valid Token", 401));
  }

    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    next(customErrorHander("Please autheticate with valid Token", 401));
  }
};

module.exports = fetchUser;
