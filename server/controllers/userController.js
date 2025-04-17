const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const signUp = async (req, res, next) => {
  try {
    // console.log("req.body.aboutMe")
    const { fullName, email, password } = req.body;

    const uploadData = await cloudinary.uploader.upload(
      req.files.photo.tempFilePath
    );
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashPassword,
      profileImgUrl: uploadData.secure_url,
      profileImgId: uploadData.public_id,
    });

    const saveData = await newUser.save();
    // console.log(saveData);
    res
      .status(200)
      .json(new ApiResponse(200, "register successfully complete", saveData));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // console.log("isUserExit is not define3", req.isUserExit);
    const token = await jwt.sign(
      {
        userId: req.isUserExit._id,
        fullName: req.isUserExit.fullName,
        email: req.isUserExit.email,
        profileImgUrl: req.isUserExit.profileImgUrl,
        profileImgId: req.isUserExit.profileImgId,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    // console.log("isUserExit is not defined 4");
    const responseData = {
      fullName: req.isUserExit.fullName,
      email: req.isUserExit.email,
      profileImgUrl: req.isUserExit.profileImgUrl,
      profileImgId: req.isUserExit.profileImgId,
      token: token,
    };

    res
      .status(200)
      .json(new ApiResponse(200, "login successful", responseData));
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, login };
