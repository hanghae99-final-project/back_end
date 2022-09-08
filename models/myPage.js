const Time = require("../schemas/time");
const Todo = require("../schemas/todo");

exports.getStudyTime = async (user, firstDay, lastDay) => {
  return await Time.find({
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
};

exports.getWeeklyTime = async (user, startWeek, endWeek) => {
  return await Time.find({
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
};
