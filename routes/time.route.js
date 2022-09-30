const express = require("express");
const router = express.Router();
const TimeController = require("../controllers/time.controller");
const asyncWrapper = require("../middleware/async");

router.route("/").get(asyncWrapper(TimeController.getTime));
router.route("/studyStart").post(asyncWrapper(TimeController.studyStart));
router.route("/studyEnd").post(asyncWrapper(TimeController.studyEnd));
router.route("/restStart").post(asyncWrapper(TimeController.restStart));
router.route("/restEnd").post(asyncWrapper(TimeController.restEnd));
router.route("/reset").put(asyncWrapper(TimeController.resetPoint));
router.route("/targetTime").post(asyncWrapper(TimeController.postTargetTime));

module.exports = router;
