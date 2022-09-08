const Time = require("../schemas/time");
const Todo = require("../schemas/todo");
const moment = require("moment");
exports.getStudyTime = async (user, firstDay, lastDay) => {
  const totalStudyTime = await Time.find({
    $and: [
      {
        createdAt: {
          $gte: firstDay,
          $lte: lastDay,
        },
      },
      {
        userId: user._id,
      },
    ],
  });

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
  return monthlyData;
};

exports.getWeeklyTime = async (user, startWeek, endWeek) => {
  const weeklyStudy = await Time.find({
    $and: [
      {
        createdAt: {
          $gte: startWeek,
          $lte: endWeek,
        },
      },
      {
        userId: user._id,
      },
    ],
  });

  const weeklyData = [];
  if (weeklyStudy.length > 0) {
    weeklyStudy.forEach((element) => {
      weeklyData.push({
        studyDate: moment(element.createdAt).format("YYYY-MM-DD"),
        studyTime: element.savedStudyTime,
      });
    });
  } else {
    weeklyData.push({ message: "해당 데이터 없음" });
  }
  return weeklyData;
};
