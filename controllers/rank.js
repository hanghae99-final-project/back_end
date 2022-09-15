const rank = require("../models/rank");
const studying = require("../models/studying");
const asyncWrapper = require("../middleware/async");

exports.getRank = asyncWrapper(async (req, res) => {
  const user = req.locals;
  const period = req.query.period; //day, week, month
  const category = req.query.category; // all, twenty, thirty
  const myRanking= {nickname:user.nickname, rank: 0, specialty:user.specialty, savedStudyTime:0, studying:false};
  let ranking = undefined;

  if (category === "all") {
    ranking = await rank.getAllRank(period);
  } else if (category === "twenty" || category === "thirty") {
    ranking = await rank.getGenerationRank(period, category);
  } else {
    throw new Error("설정된 category가 아닙니다.");
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
  
  res.status(200).json({ ranking, myRanking});
});