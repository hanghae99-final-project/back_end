const Rank = require("../service/rank");
const RankModels = require("../models/rank");
const StudyingModels = require("../models/studying");

describe("user(20대), ageGroup이 전체 일 때", () => {
  const user = {
    _id: 1234567,
    kakaoId: 1234,
    targetTime: 120,
    nickname: "김똥깡",
    ageGroup: "20대",
    specialty: "의료",
    createdAt: "2022-09-26T10:53:05.501+00:00",
  };
  RankModels.getAllRank = jest.fn(() => [
    {
      savedStudyTime: 240,
      kakaoId: 5,
      email: "user5@email.com",
      nickname: "user5",
      ageGroup: "20대",
      specialty: "의료",
    },
    {
      savedStudyTime: 170,
      kakaoId: 1234,
      email: "김똥깡@email.com",
      nickname: "김똥깡",
      ageGroup: "20대",
      specialty: "의료",
    },
    {
      savedStudyTime: 120,
      kakaoId: 1,
      email: "user1@email.com",
      nickname: "user1",
      ageGroup: "30대",
      specialty: "의료",
    },
  ]);

  test("getAllRank : 전체/월간 랭킹", async () => {
    StudyingModels.getStudying = jest.fn(() => []);

    const result = await Rank.getAllRank(user, "month", false);
    expect(result).toEqual({
      ranking: [
        {
          nickname: "user5",
          specialty: "의료",
          savedStudyTime: 240,
          studying: false,
        },
        {
          nickname: "김똥깡",
          specialty: "의료",
          savedStudyTime: 170,
          studying: false,
        },
        {
          nickname: "user1",
          specialty: "의료",
          savedStudyTime: 120,
          studying: false,
        },
      ],
      myRanking: {
        nickname: "김똥깡",
        rank: 2,
        specialty: "의료",
        savedStudyTime: 170,
        studying: false,
      },
    });
  });

  test("getAllRank : 전체/주간 랭킹", async () => {
    StudyingModels.getStudying = jest.fn(() => []);

    const result = await Rank.getAllRank(user, "week", false);
    expect(result).toEqual({
      ranking: [
        {
          nickname: "user5",
          specialty: "의료",
          savedStudyTime: 240,
          studying: false,
        },
        {
          nickname: "김똥깡",
          specialty: "의료",
          savedStudyTime: 170,
          studying: false,
        },
        {
          nickname: "user1",
          specialty: "의료",
          savedStudyTime: 120,
          studying: false,
        },
      ],
      myRanking: {
        nickname: "김똥깡",
        rank: 2,
        specialty: "의료",
        savedStudyTime: 170,
        studying: false,
      },
    });
  });

  test("getAllRank : 전체/일간 랭킹", async () => {
    StudyingModels.getStudying = jest.fn(() => []);

    const result = await Rank.getAllRank(user, "day", false);
    expect(result).toEqual({
      ranking: [
        {
          nickname: "user5",
          specialty: "의료",
          savedStudyTime: 240,
          studying: false,
        },
        {
          nickname: "김똥깡",
          specialty: "의료",
          savedStudyTime: 170,
          studying: false,
        },
        {
          nickname: "user1",
          specialty: "의료",
          savedStudyTime: 120,
          studying: false,
        },
      ],
      myRanking: {
        nickname: "김똥깡",
        rank: 2,
        specialty: "의료",
        savedStudyTime: 170,
        studying: false,
      },
    });
  });
});

describe("user(20대), ageGroup이 20대 일 때", () => {
  beforeEach(() => {
    RankModels.getGenerationRank = jest.fn(() => [
      {
        savedStudyTime: 240,
        kakaoId: 5,
        email: "user5@email.com",
        nickname: "user5",
        ageGroup: "20대",
        specialty: "의료",
      },
      {
        savedStudyTime: 170,
        kakaoId: 1234,
        email: "김똥깡@email.com",
        nickname: "김똥깡",
        ageGroup: "20대",
        specialty: "의료",
      },
    ]);
  });
  const user = {
    _id: 1234567,
    kakaoId: 1234,
    targetTime: 120,
    nickname: "김똥깡",
    ageGroup: "20대",
    specialty: "의료",
    createdAt: "2022-09-26T10:53:05.501+00:00",
  };

  test("getAllRank : 20대/월간 랭킹", async () => {
    StudyingModels.getStudying = jest.fn(() => []);

    const result = await Rank.getAllRank(user, "month", "twenty");
    expect(result).toEqual({
      ranking: [
        {
          nickname: "user5",
          specialty: "의료",
          savedStudyTime: 240,
          studying: false,
        },
        {
          nickname: "김똥깡",
          specialty: "의료",
          savedStudyTime: 170,
          studying: false,
        },
      ],
      myRanking: {
        nickname: "김똥깡",
        rank: 2,
        specialty: "의료",
        savedStudyTime: 170,
        studying: false,
      },
    });
  });

  test("getAllRank : 20대/주간 랭킹", async () => {
    StudyingModels.getStudying = jest.fn(() => []);

    const result = await Rank.getAllRank(user, "week", "twenty");
    expect(result).toEqual({
      ranking: [
        {
          nickname: "user5",
          specialty: "의료",
          savedStudyTime: 240,
          studying: false,
        },
        {
          nickname: "김똥깡",
          specialty: "의료",
          savedStudyTime: 170,
          studying: false,
        },
      ],
      myRanking: {
        nickname: "김똥깡",
        rank: 2,
        specialty: "의료",
        savedStudyTime: 170,
        studying: false,
      },
    });
  });

  test("getAllRank : 20대/일간 랭킹", async () => {
    StudyingModels.getStudying = jest.fn(() => []);

    const result = await Rank.getAllRank(user, "day", "twenty");
    expect(result).toEqual({
      ranking: [
        {
          nickname: "user5",
          specialty: "의료",
          savedStudyTime: 240,
          studying: false,
        },
        {
          nickname: "김똥깡",
          specialty: "의료",
          savedStudyTime: 170,
          studying: false,
        },
      ],
      myRanking: {
        nickname: "김똥깡",
        rank: 2,
        specialty: "의료",
        savedStudyTime: 170,
        studying: false,
      },
    });
  });
});

describe("user(20대), ageGroup이 30대 일 때", () => {
  beforeEach(() => {
    RankModels.getGenerationRank = jest.fn(() => [
      {
        savedStudyTime: 120,
        kakaoId: 1,
        email: "user1@email.com",
        nickname: "user1",
        ageGroup: "30대",
        specialty: "의료",
      },
    ]);
  });
  const user = {
    _id: 1234567,
    kakaoId: 1234,
    targetTime: 120,
    nickname: "김똥깡",
    ageGroup: "20대",
    specialty: "의료",
    createdAt: "2022-09-26T10:53:05.501+00:00",
  };

  test("getAllRank : 30대/월간 랭킹", async () => {
    StudyingModels.getStudying = jest.fn(() => []);

    const result = await Rank.getAllRank(user, "month", "thirty");
    expect(result).toEqual({
      ranking: [
        {
          nickname: "user1",
          specialty: "의료",
          savedStudyTime: 120,
          studying: false,
        },
      ],
      myRanking: {
        nickname: "김똥깡",
        rank: 0,
        specialty: "의료",
        savedStudyTime: 0,
        studying: false,
      },
    });
  });

  test("getAllRank : 30대/주간 랭킹", async () => {
    StudyingModels.getStudying = jest.fn(() => []);

    const result = await Rank.getAllRank(user, "week", "thirty");
    expect(result).toEqual({
      ranking: [
        {
          nickname: "user1",
          specialty: "의료",
          savedStudyTime: 120,
          studying: false,
        },
      ],
      myRanking: {
        nickname: "김똥깡",
        rank: 0,
        specialty: "의료",
        savedStudyTime: 0,
        studying: false,
      },
    });
  });

  test("getAllRank : 30대/일간 랭킹", async () => {
    StudyingModels.getStudying = jest.fn(() => []);

    const result = await Rank.getAllRank(user, "day", "thirty");
    expect(result).toEqual({
      ranking: [
        {
          nickname: "user1",
          specialty: "의료",
          savedStudyTime: 120,
          studying: false,
        },
      ],
      myRanking: {
        nickname: "김똥깡",
        rank: 0,
        specialty: "의료",
        savedStudyTime: 0,
        studying: false,
      },
    });
  });
});
