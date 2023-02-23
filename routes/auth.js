// external packages
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// internal packages (modules)
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUserDetail");
const { customErrorHander } = require("../errors/customError");

// code start
const router = express.Router();
// JWT secret string
JWT_SECRET = process.env.JWT_SECRET_STRING;

// ROUTER 1 :- it will send a request as post /api/v1/auth/createuser - no login required
router.post(
  "/createuser",
  [
    body("email", "eamil should be a valid email").isEmail(),
    body("password", "length of password should be greater than 5").isLength({
      min: 5,
    }),
    body("name", "name should be greater than 3").isLength({ min: 3 }),
  ],
  async (req, res,next) => {
    // check if error or not
    const errors = validationResult(req);
    // if error found the return the error's array
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      // check if user all present in db or not
      if (user) {
        return res
          .status(401)
          .json({ status: false, msg: "duplicate user are not allowed" });
      }
      // use hash password to store password in db
      const salt = await bcrypt.genSaltSync(10);
      const SecPass = await bcrypt.hashSync(req.body.password, salt);
      // it will create a document in db
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      // jwt auth token
      const token = jwt.sign(data, JWT_SECRET);

      res.status(201).json({ status: true, token });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: false, msg: "internal server error" });
    }
  }
);

// ROUTER 2 :-  it will login the user , request is - "post", endpoint is - /api/v1/auth/login and no login required

router.post(
  "/login",
  [
    body("email", "eamil should be a valid email").isEmail(),
    body("password", "eamil should be a valid email").isLength({ min: 3 }),
  ],
  async (req, res, next) => {
    // check if error or not
    const errors = validationResult(req);
    // if error found the return the error's array
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      

      let user = await User.findOne({ email: email });
      if (!user) {
        return next(customErrorHander("User not found", 404));
        // return res.status(401).json({
        //   status: false,
        //   msg: "please login with correct creditials",
        // });
      }
      const passwordChecked = await bcrypt.compare(password, user.password);
     
      
      
      if (passwordChecked) {
        const data = {
          user: {
            id: user.id,
          },
        };
        // jwt auth token
        const token = jwt.sign(data, JWT_SECRET);
      return  res.status(201).json({ status: true, token });
      } else {
        return res.status(401).json({
          status: "false",
          msg: "please login with correct creditials",
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: false, msg: "internal server error" });
    }
  }
);

// ROUTER 3 :- fetch user from jwt token using "post" and endpoint is "/ap1/v1/auth/getuser" and login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
   

    const findUser = await User.findOne({_id :req.user.id});
     if(findUser) {
     const user = await User.findById(req.user.id).select("-password");
     return  res.status(201).json({ status: true, user });

     }
     else {
      return res.status(401).json({status: false, msg: "Unauthorized"})
     }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, msg: "internal server error" });
  }
});

module.exports = router;
