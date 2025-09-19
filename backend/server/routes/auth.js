const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/userController");



//signup new user
router.post('/signup', signupUser); //Add a single user here

//login existing user
router.post('/login', loginUser);

module.exports = router