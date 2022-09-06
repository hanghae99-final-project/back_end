const jwt = require("jsonwebtoken");

exports.createJWT = function (userinfo) {
  //Send JWT access token
  console.log(userinfo.kakaoId);
  return jwt.sign(
    {
      userId: userinfo.kakaoId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};
