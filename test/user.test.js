const userService = require("../service/user");
const userValidation = require("../models/userValidation");

describe("login한 user", () => {
  const user = {
    nickname: "asdf",
    ageGroup: "",
    specialty: "",
  };

  test("user 검사하기", async () => {
    try {
      const result = await userService.nicknameCheck(user.nickname);
    } catch (err) {
      expect(err.message).toEqual(expect.any(String));
    }
  });

  test("user ageGroup검사", async () => {
    try {
      const result = await userService.ageGroupCheck(user.ageGroup);
    } catch (err) {
      expect(err.message).toEqual(expect.any(String));
    }
  });
  test("user specialtyCheck", async () => {
    try {
      const result = await userService.specialtyCheck(user.specialty);
    } catch (err) {
      expect(err.message).toEqual(expect.any(String));
    }
  });
});
