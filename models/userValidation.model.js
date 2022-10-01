const Joi = require("joi");
const User = require("../schemas/user");

exports.nicknameSchema = Joi.object({
  nickname: Joi.string()
    .min(2)
    .max(12)
    .empty()
    .pattern(new RegExp(/^[0-9a-zA-Z가-힣]+$/)) // 닉네임은 한글만입력 가능
    .required()
    .messages({
      "string.min": "2글자 ~ 8글자 이내로 작성해주세요",
      "string.max": "1글자 ~ 12글자 이내로 작성해주세요",
      "string.empty": "닉네임 입력해주세요",
      "string.pattern.base": "한글,영문,숫자만 입력가능합니다.",
    }),
});

exports.ageGroupSchema = Joi.object({
  ageGroup: Joi.string().empty().required().messages({
    "string.empty": "연령별 선택은 필수 입니다. ",
  }),
});

exports.specialtySchema = Joi.object({
  specialty: Joi.string().empty().required().messages({
    "string.empty": "나의 전문분야 선택은 필수 입니다.",
  }),
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
