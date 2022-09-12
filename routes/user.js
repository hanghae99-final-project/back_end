const express = require("express");
const router = express.Router();
const passport = require("passport");
const authMiddleware = require("../middleware/userAuth");
const User = require("../controllers/user");
const asyncWrapper = require("../middleware/async");

router.route("/kakao/finish").get(User.kakaoCallback);
router
  .route("/modProfile")
  .patch(authMiddleware, asyncWrapper(User.modProfile));

module.exports = router;