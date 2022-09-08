const express = require("express");
const router = express.Router();
const MyPage = require("../controllers/myPage");

const asyncWrapper = require("../middleware/async");

router.route("/monthlyStudy/:month").get(asyncWrapper(MyPage.getMyPageMonthly));
router.route("/dailyTodo/:day").get(asyncWrapper(MyPage.getMyDailyTodo));
router
  .route("/weeklyStudy/:startWeek/:endWeek")
  .get(asyncWrapper(MyPage.getMyWeekly));

module.exports = router;
