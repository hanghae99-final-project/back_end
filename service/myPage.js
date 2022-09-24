const { DateTime } = require("luxon");
const myPageModel = require("../models/myPage");
const todoModels = require("../models/todo");

exports.getStudyTime = async (user, yearMonth) => {
  if (yearMonth.length !== 7) {
    throw new Error("날짜 형식이 틀립니다.");
  }

  const year = yearMonth.split("-")[0];
  const month = yearMonth.split("-")[1];
  const startOfMonth = new Date(
    DateTime.fromISO(`${year}-${month}-01`).startOf("months").plus({ hours: 2 })
  );
  const endOfMonth = new Date(
    DateTime.fromISO(`${year}-${month}-01`).endOf("months").plus({ hours: 2 })
  );
  //const startOfMonth = moment().format(`${year}-${month}-01`);
  //const endOfMonth = moment().format(`${year}-${month}-`) + moment().daysInMonth();
  return await myPageModel.getStudyTime(user, startOfMonth, endOfMonth);
};

exports.getWeeklyTime = async (user, startWeek, endWeek) => {
  const regex = /\d{4}-\d{2}-\d{2}/;
  if (!regex.test(startWeek) || !regex.test(endWeek)) {
    throw new Error("날짜 형식이 틀립니다.");
  }
  const startOfWeek = new Date(DateTime.fromISO(startWeek).plus({ hours: 2 }));
  const endOfWeek = new Date(DateTime.fromISO(endWeek).plus({ hours: 2 }));
  return await myPageModel.getWeeklyTime(user, startOfWeek, endOfWeek);
};
exports.getTodo = async (day, user) => {
  if (!day) {
    throw new Error("날짜를 입력해주세요.");
  }
  return await todoModels.getTodo(day, user);
};
exports.getTotalStudyTime = async (userId) => {
  if (!userId) {
    throw new Error("로그인을 해주세요");
  }
  return await myPageModel.getTotalStudyTime(userId);
};
