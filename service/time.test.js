const Time = require("./time");
const TimeModels = require("../models/time");
const StudyingModels = require("../models/studying");
const { BadRequestError, ConflictError, NotFoundError } = require("../errors");


describe("login한 user", () => {
  const user = {
    _id: 1234567,
    kakaoId: 1234,
    targetTime: 120,
    nickname: "김똥깡",
    ageGroup: "20대",
    specialty: "의료",
    createdAt: "2022-09-26T10:53:05.501+00:00",
  };

  TimeModels.todayTime = jest.fn(() => ({
    savedStudyTime: 120,
    savedRestTime: 120,
    studyStartPoint: 60,
    restStartPoint: 60,
  }));

  test("getTime : 시간값 가져오기", async () => {
    TimeModels.yesterdayTime = jest.fn(() => ({
      savedStudyTime: 120,
    }));
    const result = await Time.getTime(user);

    expect(result).toEqual({
        yesterdayStudyTime: 120,
        targetTime: 120,
        savedStudyTime: 120,
        savedRestTime: 120,
        studyStartPoint : 60,
        restStartPoint : 60,
    });
  });

  test("studyStart : 시작 시각 없을 때", async () => {
    StudyingModels.startStudying = jest.fn(()=>{});
    TimeModels.todayTime = jest.fn(() => {});
    TimeModels.createTime = jest.fn(() => {});
    const result = await Time.studyStart(60,user);
    expect(result).toEqual("study start data create success");
  });

  test("studyStart : 오늘 데이터가 있을 때", async () => {
    StudyingModels.startStudying = jest.fn(()=>{});
    TimeModels.todayTime = jest.fn(() => ({
      studyStartPoint : 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    const result = await Time.studyStart(60,user);
    expect(result).toEqual("study start point save success");
  });

  test("studyStart : 오늘 데이터가 있을 때 - 시작시각이 있을 때", async () => {
    StudyingModels.startStudying = jest.fn(()=>{});
    TimeModels.todayTime = jest.fn(() => ({
      studyStartPoint : 60,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try{
      await Time.studyStart(60,user);
    }catch(err){
      expect(err.message).toEqual("공부 시작 포인트가 이미 존재합니다.");
    }
  });
});
