const moment = require("moment");
const myPageModel = require("../models/myPage");
const todo = require("../models/todo");

exports.getStudyTime = async (user, month) => {
  if (month.length < 2) {
    throw new Error("날짜 형식이 틀립니다.");
  }
  const startOfMonth = moment().format(`YYYY-${month}-01`);
  const endOfMonth = moment().format(`YYYY-${month}-`) + moment().daysInMonth();
  return await myPageModel.getStudyTime(user, startOfMonth, endOfMonth);
};

exports.getWeeklyTime = async (user, startWeek, endWeek) => {
  const regex = /\d{4}-\d{2}-\d{2}/;
  if (!regex.test(startWeek) || !regex.test(endWeek)) {
    throw new Error("날짜 형식이 틀립니다.");
  }
  return await myPageModel.getWeeklyTime(user, startWeek, endWeek);
};
exports.getTodo = async (day, user) => {
  if (!day) {
    throw new Error("날짜를 입력해주세요.");
  }
  return await todo.getTodo(day, user);
};
exports.getTotalStudyTime = async (userId) => {
  if (!userId) {
    throw new Error("로그인을 해주세요");
  }
  return await myPageModel.getTotalStudyTime(userId);
};
