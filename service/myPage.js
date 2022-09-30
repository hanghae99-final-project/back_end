const { DateTime } = require("luxon");
const myPageModel = require("../models/myPage");
const todoModels = require("../models/todo.model");
const { BadRequestError } = require("../errors");

exports.getStudyTime = async (user, yearMonth) => {
  if (yearMonth.length !== 7) {
    throw new BadRequestError("날짜 형식이 틀립니다.");
  }

  const year = yearMonth.split("-")[0];
  const month = yearMonth.split("-")[1];
  const startOfMonth = new Date(
    DateTime.fromISO(`${year}-${month}-01`).startOf("months")
  );
  const endOfMonth = new Date(
    DateTime.fromISO(`${year}-${month}-01`).endOf("months").plus({ days: 1 })
  );
  const totalMonthTime = await myPageModel.getStudyTime(
    user,
    startOfMonth,
    endOfMonth
  );

  const monthlyData = [];
  if (totalMonthTime.length > 0) {
    totalMonthTime.forEach((element) => {
      let day = DateTime.fromISO(element.createdAt.toISOString());
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
  const regex = /\d{4}-\d{2}-\d{2}/;
  if (!regex.test(startWeek) || !regex.test(endWeek)) {
    throw new BadRequestError("날짜 형식이 틀립니다.");
  }
  const startOfWeek = new Date(DateTime.fromISO(startWeek));
  const endOfWeek = new Date(DateTime.fromISO(endWeek).plus({ days: 1 }));

  const totalWeekTime = await myPageModel.getStudyTime(
    user,
    startOfWeek,
    endOfWeek
  );
  const weeklyData = [];
  if (totalWeekTime.length > 0) {
    totalWeekTime.forEach((element) => {
      let day = DateTime.fromISO(element.createdAt.toISOString());
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

exports.getTodo = async (day, user) => {
  if (!day) {
    throw new BadRequestError("날짜를 입력해주세요.");
  }
  return await todoModels.getTodo(day, user);
};
exports.getTotalStudyTime = async (userId) => {
  if (!userId) {
    throw new BadRequestError("로그인을 해주세요");
  }
  return await myPageModel.getTotalStudyTime(userId);
};
