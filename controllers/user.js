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

    const userInfo = await User.findOne({ kakaoId: user.kakaoId });
    const token = userModel.createJWT(userInfo);
    res.status(StatusCodes.OK).json({ token });
  })(req, res, next);
};
