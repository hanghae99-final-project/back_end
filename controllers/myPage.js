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
  // 월별(일일 공부 시간)
  const monthlyData = [];

  if (totalStudyTime.length > 0) {
    totalStudyTime.forEach((element) => {
      monthlyData.push({
        studyDate: moment(element.createdAt).format("YYYY-MM-DD"),
        studyTime: element.savedStudyTime,
      });
    });
  } else {
    monthlyData.push({ message: "해당 데이터 없음" });
  }

  return res.status(StatusCodes.OK).json({ monthlyData });
};

// //To-do
// const day = req.body.day;
// let todoData = await todo.getTodo(day, user);

// //Weekly study 데이터
// const { startWeek, endWeek } = req.body;
// const weeklyStudy = await myPageModel.getWeeklyTime(user, startWeek, endWeek);
// const weeklyData = [];
// if (weeklyStudy) {
//   weeklyStudy.forEach((element) => {
//     weeklyData.push({
//       studyDate: moment(element.createdAt).format("YYYY-MM-DD"),
//       studyTime: element.savedStudyTime,
//     });
//   });
// }

// return res.status(StatusCodes.OK).json({ monthlyData, todoData, weeklyData });
