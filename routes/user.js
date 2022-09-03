const express = require('express');
const router = express.Router();
const passport = require("passport");

const User = require('../controllers/user');


router.get("/kakao",passport.authenticate("kakao"))
router.get("/kakao/finish", User.kakaoCallback);


module.exports = router;