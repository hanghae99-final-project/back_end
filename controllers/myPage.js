const myPageModel = require("../models/myPage");
const todo = require("../models/todo");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");

exports.getMyPageMonthly = async (req, res) => {
  const user = req.locals;
  const { month } = req.params;

  const startOfMonth = moment().format(`YYYY-${month}-01`);
  const endOfMonth = moment().format(`YYYY-${month}-`) + moment().daysInMonth();

  const totalStudyTime = await myPageModel.getStudyTime(
    user,
    startOfMonth,
    endOfMonth
  );

  return res.status(StatusCodes.OK).json({ totalStudyTime });
};

exports.getMyWeekly = async (req, res) => {
  const user = req.locals;
  //날짜 형식
  const regex = /\d{4}-\d{2}-\d{2}/;

  //Weekly study 데이터
  const { startWeek, endWeek } = req.params;

  if (!regex.test(startWeek) || !regex.test(endWeek)) {
    throw new Error("날짜 형식이 틀립니다.");
  }

  const weeklyStudy = await myPageModel.getWeeklyTime(user, startWeek, endWeek);
  return res.status(StatusCodes.OK).json({ weeklyStudy });
};
// return res.status(StatusCodes.OK).json({ monthlyData, todoData, weeklyData });

exports.getMyDailyTodo = async (req, res) => {
  const user = req.locals;
  //To-do
  const day = req.params.day;
  let todoData = await todo.getTodo(day, user);

  return res.status(StatusCodes.OK).json({ todoData });
};
exports.getTotalStudyTime = async (req, res) => {
  const user = req.locals;
  const totalStudyTime = await myPageModel.getTotalStudyTime(user._id);
  return res.status(StatusCodes.OK).json({ totalStudyTime });
};
