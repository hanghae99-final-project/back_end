const Time = require("../schemas/time");
const User = require("../schemas/user");
const moment = require("moment");

exports.getAllRank = async (period) => {
    let periodStart = undefined;
    let periodEnd = undefined;
    let today = moment();
    if (today.hours() < 2) {
      today = today.add(-1, "days");
    }

    if (period === "day"){
        periodStart = moment(today).startOf("day").add(2, "hours");
        periodEnd = moment(today).endOf("day").add(2, "hours");
    }
    else if (period === "week"){ //주의 시작은 월요일부터 (일요일부터 시작할 경우 moment(today).startOf("week"))
        periodStart = moment(today).day(1).startOf("day").add(2, "hours");
        periodEnd = moment(today).day(7).endOf("day").add(2, "hours");
    }
    else if (period === "month"){
        periodStart = moment(today).startOf("month").add(2, "hours");
        periodEnd = moment(today).endOf("month").add(2, "hours");
    }
    else {
        throw new Error("설정된 period가 아닙니다.");
    }

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
          },
        },
      ]);
      return periodRank;
};

exports.getGenerationRank = async (period, category) => {
    let periodStart = undefined;
    let periodEnd = undefined;
    let today = moment();
    if (today.hours() < 2) {
      today = today.add(-1, "days");
    }

    if (period === "day"){
        periodStart = moment(today).startOf("day").add(2, "hours");
        periodEnd = moment(today).endOf("day").add(2, "hours");
    }
    else if (period === "week"){ //주의 시작은 월요일부터 (일요일부터 시작할 경우 moment(today).startOf("week"))
        periodStart = moment(today).day(1).startOf("day").add(2, "hours");
        periodEnd = moment(today).day(7).endOf("day").add(2, "hours");
    }
    else if (period === "month"){
        periodStart = moment(today).startOf("month").add(2, "hours");
        periodEnd = moment(today).endOf("month").add(2, "hours");
    }
    else {
        throw new Error("설정된 period가 아닙니다.");
    }

    if (category === "twenty"){
        category="20대"
    }
    else if (category === "thirty"){
        category="30대"
    }
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
          },
        },
        {
            $match: {
                ageGroup: `${category}`
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
