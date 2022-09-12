const jwt = require("jsonwebtoken");
const user = require("../schemas/user");

exports.createJWT = function (userinfo) {
  //Send JWT access token
  // console.log(userinfo.kakaoId);
  if (userinfo.kakaoId) {
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
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
  } else if (!userinfo.kakaoId) {
    return jwt.sign(
      {
        userId: userinfo.adminEmail,
      },
      process.env.JWT_LIFETIME,
      {
        expiresIn: process.env.JWT_REFRESH_TIME,
      }
    );
  }
};

exports.createRefresh = function (userinfo) {
  //Send JWT access token

  if (userinfo.kakaoId) {
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
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TIME,
      }
    );
  } else if (!userinfo.kakaoId) {
    return jwt.sign(
      {
        userId: userinfo.adminEmail,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TIME,
      }
    );
  }
};
