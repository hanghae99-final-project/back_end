const rank = require("../models/rank");
const studying = require("../models/studying");
const moment = require("moment");

exports.getAllRank = async (user, period, category) => {
  const myRanking= {nickname:user.nickname, rank: 0, specialty:user.specialty, savedStudyTime:0, studying:false};
  let periodStart = undefined;
  let periodEnd = undefined;
  let ranking = undefined;
  let today = moment();

  
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }
  if (period === "day") {
    periodStart = moment(today).startOf("day").add(2, "hours");
    periodEnd = moment(today).endOf("day").add(2, "hours");
  } else if (period === "week") {
    //주의 시작은 월요일부터 (일요일부터 시작할 경우 moment(today).startOf("week"))
    periodStart = moment(today).day(1).startOf("day").add(2, "hours");
    periodEnd = moment(today).day(7).endOf("day").add(2, "hours");
  } else if (period === "month") {
    periodStart = moment(today).startOf("month").add(2, "hours");
    periodEnd = moment(today).endOf("month").add(2, "hours");
  } else {
    throw new Error("설정된 period가 아닙니다.");
  }
  if(category){
    if (category === "twenty"){
        category="20대"
    }
    else if (category === "thirty"){
        category="30대"
    }
    ranking = await rank.getGenerationRank(periodStart, periodEnd, category);
  }else{
    ranking = await rank.getAllRank(periodStart, periodEnd);
  }

  const studyingPerson = await studying.getStudying();

  ranking = ranking.map((element, index) => {
    let studyingDefault = false;
    studyingPerson.find((people) => {
      if (people.kakaoId === element.kakaoId) {
        studyingDefault = true;
      }
    });
    if(element.kakaoId === user.kakaoId){
        myRanking.rank=index+1;
        myRanking.savedStudyTime=element.savedStudyTime;
        myRanking.studying=studyingDefault;
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
  return {ranking, myRanking};
};