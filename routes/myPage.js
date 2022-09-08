const express = require("express");
const router = express.Router();
const MyPage = require("../controllers/myPage");

const asyncWrapper = require("../middleware/async");

router.route("/monthlyStudy/:month").get(asyncWrapper(MyPage.getMyPageMonthly));

module.exports = router;
