const passport = require("passport");
const { StatusCodes } = require("http-status-codes");
const User = require("../schemas/user");
const userModel = require("../models/login");

exports.main = (req, res) => {
  res.send("Hello World");
};

exports.kakaoCallback = (req, res, next) => {
  passport.authenticate("kakao", async (err, user) => {
    if (err) return next(err);

    const { kakaoId } = user;
    const userInfo = await User.findOne({ kakaoId });

    const token = userModel.createJWT(userInfo);
    res.status(StatusCodes.OK).json({ token });
  })(req, res, next);
};
exports.main = (req, res) => {
  const { kakaoId, email } = req.locals;
  if (req.locals.nickname) {
    console.log("닉네임 있음");
  }
};
