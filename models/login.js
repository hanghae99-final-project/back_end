const jwt = require("jsonwebtoken");

exports.createJWT = function (userinfo) {
  //Send JWT access token
  // console.log(userinfo.kakaoId);
  if (userinfo.kakaoId) {
    return jwt.sign(
      {
        userId: userinfo.kakaoId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
  } else if (!userinfo.kakaoId) {
    return jwt.sign(
      {
        userId: userinfo.adminEmail,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
  }
};
