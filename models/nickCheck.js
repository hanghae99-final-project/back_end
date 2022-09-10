const User = require("../schemas/user");
const Joi = require("joi");

exports.nicknameJoiCheck = Joi.object({
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
});

exports.getNickCheck = async (user, nickname) => {
  const result = await User.findOne({
    $and: [{ kakaoId: { $ne: user.kakaoId } }, { nickname }],
  });
  if (result){
    return false;
  }
  else {
    return true;
  }
};
