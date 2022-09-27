const Time = require("./time");
const TimeModels = require("../models/time");
const StudyingModels = require("../models/studying");

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
      studyStartPoint: 60,
      restStartPoint: 60,
    });
  });

  test("studyStart : 오늘자 공부 데이터가 없을 때", async () => {
    StudyingModels.startStudying = jest.fn(() => {});
    TimeModels.todayTime = jest.fn(() => {});
    TimeModels.createTime = jest.fn(() => {});
    const result = await Time.studyStart(60, user);
    expect(result).toEqual("study start data create success");
  });

  test("studyStart : 오늘자 공부 데이터가 있을 때", async () => {
    StudyingModels.startStudying = jest.fn(() => {});
    TimeModels.todayTime = jest.fn(() => ({
      studyStartPoint: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    const result = await Time.studyStart(60, user);
    expect(result).toEqual("study start point save success");
  });

  test("studyStart : 오늘자 공부 데이터가 있을 때 - 시작시각이 있을 때", async () => {
    StudyingModels.startStudying = jest.fn(() => {});
    TimeModels.todayTime = jest.fn(() => ({
      studyStartPoint: 60,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.studyStart(60, user);
    } catch (err) {
      expect(err.message).toEqual("공부 시작 포인트가 이미 존재합니다.");
    }
  });

  test("studyEnd : 정상적일 때", async () => {
    StudyingModels.endStudying = jest.fn(() => {});
    TimeModels.todayTime = jest.fn(() => ({
      studyStartPoint: 60,
      restStartPoint: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    const result = await Time.studyEnd(120, user);
    expect(result).toEqual("Study time has been accumulated.");
  });

  test("studyEnd : 휴식시각이 기록되어 있을 때", async () => {
    StudyingModels.endStudying = jest.fn(() => {});
    TimeModels.todayTime = jest.fn(() => ({
      studyStartPoint: 60,
      restStartPoint: 60,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.studyEnd(120, user);
    } catch (err) {
      expect(err.message).toEqual("휴식 시작 시각이 기록되어 있습니다.");
    }
  });

  test("studyEnd : 공부시작 시각이 0일 때", async () => {
    StudyingModels.endStudying = jest.fn(() => {});
    TimeModels.todayTime = jest.fn(() => ({
      studyStartPoint: 0,
      restStartPoint: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.studyEnd(120, user);
    } catch (err) {
      expect(err.message).toEqual("공부 시작 시각이 기록되어 있지 않습니다.");
    }
  });

  test("studyEnd : 공부 종료 시각이 공부 시작 시각보다 앞서 있을 때", async () => {
    StudyingModels.endStudying = jest.fn(() => {});
    TimeModels.todayTime = jest.fn(() => ({
      studyStartPoint: 180,
      restStartPoint: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.studyEnd(120, user);
    } catch (err) {
      expect(err.message).toEqual(
        "공부 종료 시각이 공부 시작 시각보다 시간상 앞서 있습니다."
      );
    }
  });

  test("studyEnd : 공부 데이터가 없을 때", async () => {
    StudyingModels.endStudying = jest.fn(() => {});
    TimeModels.todayTime = jest.fn(() => {});
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.studyEnd(120, user);
    } catch (err) {
      expect(err.message).toEqual("데이터가 없습니다.");
    }
  });

  test("restStart : 정상적일 때(공부 시간은 누적되고 휴식 시작 시각 기록)", async () => {
    TimeModels.todayTime = jest.fn(() => ({
      restStartPoint: 0,
      studyStartPoint: 60,
      savedRestTime: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    const result = await Time.restStart(120, 120, user);
    expect(result).toEqual("rest start success");
  });

  test("restStart : 공부 시작 시각이 없을 때", async () => {
    TimeModels.todayTime = jest.fn(() => ({
      restStartPoint: 0,
      studyStartPoint: 0,
      savedRestTime: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.restStart(120, 120, user);
    } catch (err) {
      expect(err.message).toEqual(
        "공부 시작 포인트가 없습니다. 휴식은 공부를 시작한 후에 가능합니다."
      );
    }
  });

  test("restStart : 휴식 시작 시각이 이미 있을 때", async () => {
    TimeModels.todayTime = jest.fn(() => ({
      restStartPoint: 60,
      studyStartPoint: 60,
      savedRestTime: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.restStart(120, 120, user);
    } catch (err) {
      expect(err.message).toEqual("휴식 시작 포인트가 이미 존재합니다.");
    }
  });

  test("restStart : 공부 종료 시각이 공부 시작 시각보다 앞설 때", async () => {
    TimeModels.todayTime = jest.fn(() => ({
      restStartPoint: 0,
      studyStartPoint: 180,
      savedRestTime: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.restStart(120, 120, user);
    } catch (err) {
      expect(err.message).toEqual(
        "공부 종료 시각이 공부 시작 시각보다 시간상 앞서 있습니다."
      );
    }
  });

  test("restStart : 데이터가 없을 때", async () => {
    TimeModels.todayTime = jest.fn(() => {});
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.restStart(120, 120, user);
    } catch (err) {
      expect(err.message).toEqual("데이터가 없습니다.");
    }
  });

  test("restEnd : 정상적일 때", async () => {
    TimeModels.todayTime = jest.fn(() => ({
      savedRestTime: 0,
      restStartPoint: 60,
      studyStartPoint: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    const result = await Time.restEnd(120, 120, user);
    expect(result).toEqual("Rest time has been accumulated.");
  });

  test("restEnd : 휴식 시작 시각이 0일 때", async () => {
    TimeModels.todayTime = jest.fn(() => ({
      restStartPoint: 0,
      studyStartPoint: 0,
      savedRestTime: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.restEnd(120, 120, user);
    } catch (err) {
      expect(err.message).toEqual("휴식 시작 시각이 기록되어 있지 않습니다.");
    }
  });

  test("restEnd : 공부 시작 시각이 존재할 때", async () => {
    TimeModels.todayTime = jest.fn(() => ({
      restStartPoint: 60,
      studyStartPoint: 60,
      savedRestTime: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.restEnd(120, 120, user);
    } catch (err) {
      expect(err.message).toEqual("공부 시작 시각이 기록되어 있습니다.");
    }
  });

  test("restEnd : 휴식 종료 시각이 휴식 시작 시각보다 앞설 때", async () => {
    TimeModels.todayTime = jest.fn(() => ({
      restStartPoint: 180,
      studyStartPoint: 0,
      savedRestTime: 0,
    }));
    TimeModels.saveTime = jest.fn(() => {});
    try {
      await Time.restEnd(120, 120, user);
    } catch (err) {
      expect(err.message).toEqual(
        "휴식 종료 시각이 휴식 시작 시각보다 시간상 앞서 있습니다."
      );
    }
  });
});
