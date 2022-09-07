const express = require("express");
const router = express.Router();
const passport = require("passport");
const authMiddleware = require("../middleware/userAuth");
const User = require("../controllers/user");

router.route("/kakao/finish").get(User.kakaoCallback);
router.route("/").get(authMiddleware, User.main);

module.exports = router;
