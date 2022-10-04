const jwt = require("jsonwebtoken");
const user = require("../schemas/user");

exports.findUser = async (kakaoId) => {
  return user.findOne({ kakaoId });
};

exports.createJWT = function (userinfo) {
  //Send JWT access token
  let nickname = "";
  if (userinfo.nickname) {
    nickname = userinfo.nickname;
  }
  return jwt.sign(
    {
      userId: userinfo.kakaoId,
      userEmail: userinfo.email,
      nickname: nickname,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    }
  );
};
