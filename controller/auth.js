const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal packages (modules)
const User = require("../models/User");
const { customErrorHander } = require("../errors/customError");
const asyncWapper = require("../middleware/async");
require("dotenv").config();

// JWT secret string
JWT_SECRET = process.env.JWT_SECRET_STRING;

// SignUp
const usersignup = asyncWapper(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email: req.body.email });

  //   Check is user is already present or not
  if (user) {
    return next(customErrorHander("Username already found.", 401));
  }

  // use hash password to store password in db
  const salt = await bcrypt.genSaltSync(10);
  const SecPass = await bcrypt.hashSync(req.body.password, salt);
  console.log("secured password is :", SecPass);
  // it will create a document in db
  user = await User.create({
    name: name,
    email: email,
    password: SecPass,
  });
  console.log("user is :", user);
  const data = {
    user: {
      id: user.id,
    },
  };
  // jwt auth token
  const token = await jwt.sign(data, JWT_SECRET);
  console.log("jwt token is : ", JWT_SECRET);
  console.log("token is :", token);

  res.status(201).json({ status: true, token });
});

// Login
const userLogin = asyncWapper(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    return next(customErrorHander("Please Login With correct Creditials", 404));
  }
  const passwordChecked = await bcrypt.compare(password, user.password);

  if (!passwordChecked) {
    return next(customErrorHander("Please Login With correct Creditials", 401));
  }

  const data = {
    user: {
      id: user.id,
    },
  };
  // jwt auth token
  const token = jwt.sign(data, JWT_SECRET);
  res.status(201).json({ status: true, token });
});

//   Gete the user details if header of req body contain correct auth token
const getuserdetail = asyncWapper(async (req, res, next) => {
  const id = req.user.id;
  console.log(id);

  let findUser = await User.findOne({ _id: id });
  if (!findUser) {
    return next(customErrorHander("User not found", 404));
  }
  findUser = await User.findOne({ _id: id }).select("-password");
  return res.status(201).json({ status: true, findUser });
});

module.exports = { userLogin, usersignup, getuserdetail };
