const myPage = require("../service/myPage.service");

const TimeModels = require("../models/time.model");

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
    myPage.getStudyTime = jest.fn(() => ({
      savedStudyTime: 120,
      savedRestTime: 120,
      studyStartPoint: 60,
      restStartPoint: 60,
    }));
    const result = await myPage.getStudyTime(user, "2022-10");

    expect(result).toEqual({
      savedStudyTime: 120,
      savedRestTime: 120,
      studyStartPoint: 60,
      restStartPoint: 60,
    });
  });
});
