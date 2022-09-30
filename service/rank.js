const rankModels = require("../models/rank");
const studyingModels = require("../models/studying");
const { DateTime } = require("luxon");

exports.getAllRank = async (user, period, category) => {
  const myRanking = {
    nickname: user.nickname,
    rank: 0,
    specialty: user.specialty,
    savedStudyTime: 0,
    studying: false,
  };
  let periodStart = undefined;
  let periodEnd = undefined;
  let ranking = undefined;
  let today = DateTime.now();

  if (period === "day") {
    periodStart = new Date(today.startOf("days"));
    periodEnd = new Date(today.endOf("days"));
  } else if (period === "week") {
    periodStart = new Date(today.startOf("weeks"));
    periodEnd = new Date(today.endOf("weeks"));
  } else if (period === "month") {
    periodStart = new Date(today.startOf("months"));
    periodEnd = new Date(today.endOf("months"));
  }
  if (category) {
    if (category === "twenty") {
      category = "20대";
    } else if (category === "thirty") {
      category = "30대";
    }
    ranking = await rankModels.getGenerationRank(
      periodStart,
      periodEnd,
      category
    );
  } else {
    ranking = await rankModels.getAllRank(periodStart, periodEnd);
  }

  const studyingPerson = await studyingModels.getStudying();

  ranking = ranking.map((element, index) => {
    let studyingDefault = false;
    if (studyingPerson.length) {
      studyingPerson.find((people) => {
        if (people.kakaoId === element.kakaoId) {
          studyingDefault = true;
        }
      });
    }
    if (element.kakaoId === user.kakaoId) {
      myRanking.rank = index + 1;
      myRanking.savedStudyTime = element.savedStudyTime;
      myRanking.studying = studyingDefault;
    }
    const nickname = element.nickname;
    const savedStudyTime = element.savedStudyTime;
    const specialty = element.specialty;
    const studying = studyingDefault;
    return { nickname, specialty, savedStudyTime, studying };
  });

  if (ranking.length > 20) {
    ranking = ranking.slice(0, 20);
  }
  return { ranking, myRanking };
};
