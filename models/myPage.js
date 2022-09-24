const Time = require("../schemas/time");
const { DateTime } = require("luxon");
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
      const day = DateTime.fromISO(element.createdAt.toISOString());
      if(day.hour < 2){
        day = day.minus({ days: 1 });
      }
      monthlyData.push({
        studyDate: day.toISODate(),
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
      const day = DateTime.fromISO(element.createdAt.toISOString());
      if(day.hour < 2){
        day = day.minus({ days: 1 });
      }
      weeklyData.push({
        studyDate: day.toISODate(),
        studyTime: element.savedStudyTime,
      });
    });
  } else {
    weeklyData.push({ message: "해당 데이터 없음" });
  }
  return weeklyData;
};

//누적시간 가져오기
exports.getTotalStudyTime = async (userId) => {
  const result = await Time.find({ userId });
  let totals = 0;
  result.forEach((element) => {
    totals += element.savedStudyTime;
  });
  return totals;
};
