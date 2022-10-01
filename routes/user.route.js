const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/userAuth");
const User = require("../controllers/user.controller");
const notification = require("../config/notification");
const asyncWrapper = require("../middleware/async");

// router.route("/kakao/finish").get(User.kakaoCallback);
router.route("/kakao/callback").get(User.kakaoCallbackLocal);
router
  .route("/modProfile")
  .patch(authMiddleware, asyncWrapper(User.modProfile));
router.route("/notification", asyncWrapper(notification.scheduler));

module.exports = router;
