const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../controllers/user");

router.get("/kakao/finish", User.kakaoCallback);

module.exports = router;
