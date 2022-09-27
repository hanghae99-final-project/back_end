const myPage = require("../service/myPage");
const myPageModels = require("../models/myPage");

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

  test("getTime : 시간값 가져오기", async () => {
    myPageModels.getStudyTime = jest.fn(() => ({
      savedStudyTime: 120,
    }));
    try {
      console.log(myPageModels.getStudyTime);
      const result = await myPage.getStudyTime(user);
    } catch (error) {
      console.log(error);
    }
    // expect(result).toEqual({
    //   yesterdayStudyTime: 120,
    //   targetTime: 120,
    //   savedStudyTime: 120,
    //   savedRestTime: 120,
    //   studyStartPoint: 60,
    //   restStartPoint: 60,
    // });
  });
});
