const passport = require("passport");
const { StatusCodes } = require("http-status-codes");
const User = require("../schemas/user");
const userModel = require("../models/login");
const { profileSchema, checkNickname } = require("../models/userValidation");

exports.kakaoCallback = (req, res, next) => {
  passport.authenticate("kakao", async (err, user) => {
    if (err) return next(err);

    const { kakaoId } = user;
    const userInfo = await User.findOne({ kakaoId });

    const token = userModel.createJWT(userInfo);
    res.status(StatusCodes.OK).json({ token });
  })(req, res, next);
};
//회원 수정
exports.modProfile = async (req, res) => {
  const user = req.locals;
  //닉네임, 연령별, 전문분야 선택
  const { nickname, ageGroup, specialty } = await profileSchema.validateAsync(
    req.body
  );
  const check = await checkNickname(user._id, nickname);
  if (check) {
    return res
      .status(StatusCodes.OK)
      .json({ message: "프로필 수정이 완료 되었습니다." });
  } else {
    throw new Error("닉네임이 중복 됩니다.");
  }
};
