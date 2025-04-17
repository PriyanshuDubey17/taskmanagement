const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// validate register user which are all ready our user to nhi

const authRegister = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return next(new ApiError("missing filed", 500));
    }

    // Check if profile picture
    if (!req.files || !req.files.photo) {
      return next(new ApiError("Profile picture is missing", 400));
    }

    const isUserExits = await User.findOne({
      email: email,
    });

    if (isUserExits) {
      return next(new ApiError("email already exits .", 500));
    }
    next();
  } catch (error) {
    next(error);
  }
};

// here i m check who user come to login he must have an account in my app

const authLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ApiError("missing filed", 500));
    }
    //console.log("isUserExit is not defined")
    const isUserExit = await User.findOne({ email: email });
    if (!isUserExit) {
      return next(new ApiError("user not found .", 500));
    }
    // console.log("isUserExit is not defined 1");

    const verifyPassword = await bcrypt.compare(password, isUserExit.password);
    //console.log("isUserExit is not defined")
    if (!verifyPassword) {
      return next(new ApiError("password is invalid", 500));
    }
    req.isUserExit = isUserExit;
    //console.log("isUserExit is not defined")
    next();
  } catch (error) {
    next(error);
  }
};

// token validator middleware

const tokenChecker = async (req, res, next) => {
  try {
    //console.log(req.headers.authorization.split(" ")[1]);
    if (!req.headers.authorization) {
      return next(new ApiError("token nhi hai", 401));
    }

    // token sath me laya hai user to hm check krenge mere hi app se bnaya gya user hai
    const tokenVerify = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET_KEY
    );
    // console.log(tokenVerify);
    const userExits = await User.findOne({ _id: tokenVerify.userId });

    if (!userExits) {
      return next(new ApiError("you are not valid user", 401));
    }
    //  console.log(userExits)
    req.tokenData = tokenVerify;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authRegister, authLogin, tokenChecker };
