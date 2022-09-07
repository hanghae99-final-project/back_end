const express = require('express');
const router = express.Router();
const TimeController = require("../controllers/time");

// const User = require('../controllers/user');
// router.get("/kakao",passport.authenticate("kakao"))
// router.get("/kakao/finish", User.kakaoCallback);

router.route("/").get(TimeController.getTime);
router.route("/studyStart").post(TimeController.studyStart);
router.route("/studyEnd").post(TimeController.studyEnd);
router.route("/restStart").post(TimeController.restStart);
router.route("/restEnd").post(TimeController.restEnd);


module.exports = router;