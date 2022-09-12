const express = require('express');
const router = express.Router();
const TimeController = require("../controllers/time");

router.route("/").get(TimeController.getTime);
router.route("/studyStart").post(TimeController.studyStart);
router.route("/studyEnd").post(TimeController.studyEnd);
router.route("/restStart").post(TimeController.restStart);
router.route("/restEnd").post(TimeController.restEnd);
/**
 * 날짜 : 2022.9.12 pm 3:04
 * 이름 : 모든 시간 초기화
 * 내용 : 프론트에서 db접근을 할 수 가 없어 초기화 기능 요청함
 * commit -m "시간 초기화 api 추가"
 */
router.route("/reset").put(TimeController.resetPoint);


module.exports = router;