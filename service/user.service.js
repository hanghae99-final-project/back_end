const userModels = require("../models/userValidation.model");
const userModel = require("../models/login.model");
const { BadRequestError } = require("../errors");

exports.findUser = async (kakaoId) => {
  return await userModel.findUser(kakaoId);
};

exports.createJWT = async (userInfo) => {
  return await userModel.createJWT(userInfo);
};

exports.nicknameCheck = async (nickname) => {
  await userModels.nicknameSchema.validateAsync({ nickname }).catch((error) => {
    throw new BadRequestError(error.message);
  });
};
exports.ageGroupCheck = async (ageGroup) => {
  await userModels.ageGroupSchema.validateAsync({ ageGroup }).catch((error) => {
    throw new BadRequestError(error.message);
  });
};
exports.specialtyCheck = async (specialty) => {
  await userModels.specialtySchema
    .validateAsync({ specialty })
    .catch((error) => {
      throw new BadRequestError(error.message);
    });
};
exports.checkNickname = async (user, nickname, ageGroup, specialty) => {
  return await userModels.checkNickname(user, nickname, ageGroup, specialty);
};
