const myPageService = require("../service/myPageService");
const { StatusCodes } = require("http-status-codes");

exports.getMyPageMonthly = async (req, res) => {
  const user = req.locals;
  const { month } = req.params;
  const totalStudyTime = await myPageService.getStudyTime(user, month);
  return res.status(StatusCodes.OK).json({ totalStudyTime });
};

exports.getMyWeekly = async (req, res) => {
  const user = req.locals;
  //Weekly study 데이터
  const { startWeek, endWeek } = req.params;
  const weeklyStudy = await myPageService.getWeeklyTime(
    user,
    startWeek,
    endWeek
  );
  return res.status(StatusCodes.OK).json({ weeklyStudy });
};
// return res.status(StatusCodes.OK).json({ monthlyData, todoData, weeklyData });

exports.getMyDailyTodo = async (req, res) => {
  const user = req.locals;
  //To-do
  const day = req.params.day;
  let todoData = await myPageService.getTodo(day, user);
  return res.status(StatusCodes.OK).json({ todoData });
};
exports.getTotalStudyTime = async (req, res) => {
  const user = req.locals;
  const totalStudyTime = await myPageService.getTotalStudyTime(user._id);
  return res.status(StatusCodes.OK).json({ totalStudyTime });
};
