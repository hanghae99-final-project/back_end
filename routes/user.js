const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../controllers/user");

// router.get("/kakao", passport.authenticate("kakao"));
router.get("/login/kakao/callback", User.kakaoCallback);

module.exports = router;
