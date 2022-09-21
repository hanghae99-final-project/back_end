const userModels = require("../models/userValidation");
const userModel = require("../models/login");

exports.findUser = async (kakaoId) => {
  return await userModel.findUser(kakaoId);
};

exports.createJWT = async (userInfo) => {
  return await userModel.createJWT(userInfo);
};
exports.nicknameCheck = async (nickname) => {
  await userModels.nicknameSchema.validateAsync({ nickname });
};
exports.ageGroupCheck = async (ageGroup) => {
  await userModels.ageGroupSchema.validateAsync({ ageGroup });
};
exports.specialtyCheck = async (specialty) => {
  await userModels.specialtySchema.validateAsync({ specialty });
};
