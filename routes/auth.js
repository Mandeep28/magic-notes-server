// external packages
const express = require("express");
const { userLogin, getuserdetail, usersignup } = require("../controller/auth");

const fetchUser = require("../middleware/fetchUserDetail");
const router = express.Router();


// ROUTER 1 :- it will send a request as post /api/v1/auth/createuser - no login required
router.post("/createuser",usersignup);

// ROUTER 2 :-  it will login the user , request is - "post", endpoint is - /api/v1/auth/login and no login required

router.post( "/login",userLogin);

// ROUTER 3 :- fetch user from jwt token using "post" and endpoint is "/ap1/v1/auth/getuser" and login required
router.post("/getuserdetail", fetchUser, getuserdetail);

module.exports = router;
