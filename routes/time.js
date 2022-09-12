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
/**
 * 날짜 : 2022.9.12 pm 4:45
 * 이름 : targetTime(목표시간) 입력 api
 * 내용 : user의 하루 공부 목표시간을 저장하는 api
 * commit -m "targetTime 입력 api 추가"
 */
router.route("/targetTime").post(TimeController.postTargetTime);


module.exports = router;