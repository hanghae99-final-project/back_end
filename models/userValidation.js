const e = require("express");
const Joi = require("joi");

const User = require("../schemas/user");

exports.profileSchema = Joi.object({
  nickname: Joi.string()
    .min(1)
    .max(8)
    .empty()
    .pattern(new RegExp(/^[ㄱ-ㅎ|가-힣]+$/)) // 닉네임은 한글만입력 가능
    .required()
    .messages({
      "string.min": "1글자 ~ 8글자 이내로 작성해주세요",
      "string.max": "1글자 ~ 8글자 이내로 작성해주세요",
      "string.empty": "닉네임 입력해주세요",
      "string.pattern.base": "한글만 입력가능합니다.",
    }),
  ageGroup: Joi.string().empty().required().messages({
    "string.empty": "연령별 선택은 필수 입니다. ",
  }),
  specialty: Joi.string().empty().required().messages({
    "string.empty": "나의 전문분야 선택은 필수 입니다.",
  }),
});

exports.nicknameSchema = Joi.object({
  nickname: Joi.string()
    .min(1)
    .max(8)
    .empty()
    .pattern(new RegExp(/^[ㄱ-ㅎ|가-힣]+$/)) // 닉네임은 한글만입력 가능
    .required()
    .messages({
      "string.min": "1글자 ~ 8글자 이내로 작성해주세요",
      "string.max": "1글자 ~ 8글자 이내로 작성해주세요",
      "string.empty": "닉네임 입력해주세요",
      "string.pattern.base": "한글만 입력가능합니다.",
    })
});

exports.ageGroupSchema = Joi.object({
  ageGroup: Joi.string().empty().required().messages({
    "string.empty": "연령별 선택은 필수 입니다. ",
  })
});

exports.specialtySchema = Joi.object({
  specialty: Joi.string().empty().required().messages({
    "string.empty": "나의 전문분야 선택은 필수 입니다.",
  })
});



exports.checkNickname = async (id, nickname, ageGroup, specialty) => {
  const result = await User.findOne({ nickname: nickname });
  if (result) {
    return false;
  } else {
    await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: { nickname: nickname, ageGroup: ageGroup, specialty: specialty },
      },
      { runValidators: true }
    );
  }
  return true;
};