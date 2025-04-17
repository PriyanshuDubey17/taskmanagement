const express = require("express");
const {signUp,login}= require("../controllers/userController")
const router = express.Router();
const {authRegister, authLogin}= require("../middleware/authChecker")



router.post("/sign-up" ,authRegister,signUp);
router.post("/login" ,authLogin, login);

module.exports = router;
