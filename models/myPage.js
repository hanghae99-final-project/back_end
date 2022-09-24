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
  return totalStudyTime;
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
