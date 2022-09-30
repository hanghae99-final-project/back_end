const express = require("express");
const router = express.Router();
const MyPage = require("../controllers/myPage.controller");

const asyncWrapper = require("../middleware/async");

router
  .route("/monthlyStudy/:yearMonth")
  .get(asyncWrapper(MyPage.getMyPageMonthly));
router.route("/dailyTodo/:day").get(asyncWrapper(MyPage.getMyDailyTodo));
router
  .route("/weeklyStudy/:startWeek/:endWeek")
  .get(asyncWrapper(MyPage.getMyWeekly));
router.route("/getTotalStudyTime").get(asyncWrapper(MyPage.getTotalStudyTime));

module.exports = router;
