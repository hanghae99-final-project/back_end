const Time = require("../schemas/time");

exports.getAllRank = async (periodStart, periodEnd) => {
  const periodRank = await Time.aggregate([
    {
      $match: {
        createdAt: {
          $gte: periodStart.toDate(),
          $lte: periodEnd.toDate(),
        },
      },
    },
    {
      $group: {
        _id: "$userId",
        savedStudyTime: { $sum: "$savedStudyTime" },
      },
    },
    {
      $sort: {
        savedStudyTime: -1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userId",
      },
    },
    {
      $unwind: "$userId",
    },
    {
      $project: {
        savedStudyTime: 1,
        kakaoId: "$userId.kakaoId",
        email: "$userId.email",
        nickname: "$userId.nickname",
        ageGroup: "$userId.ageGroup",
        specialty: "$userId.specialty",
      },
    },
  ]);
  return periodRank;
};

exports.getGenerationRank = async (periodStart, periodEnd, category) => {
  const periodRank = await Time.aggregate([
    {
      $match: {
        createdAt: {
          $gte: periodStart.toDate(),
          $lte: periodEnd.toDate(),
        },
      },
    },
    {
      $group: {
        _id: "$userId",
        savedStudyTime: { $sum: "$savedStudyTime" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userId",
      },
    },
    {
      $unwind: "$userId",
    },
    {
      $project: {
        savedStudyTime: 1,
        kakaoId: "$userId.kakaoId",
        email: "$userId.email",
        nickname: "$userId.nickname",
        ageGroup: "$userId.ageGroup",
        specialty: "$userId.specialty",
      },
    },
    {
      $match: {
        ageGroup: `${category}`,
      },
    },
    {
      $sort: {
        savedStudyTime: -1,
      },
    },
  ]);
  return periodRank;
};
