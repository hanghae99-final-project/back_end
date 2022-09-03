const passport = require("passport");
const { StatusCodes } = require("http-status-codes");

exports.main = (req, res) => {
    res.send("Hello World")
}

exports.kakaoCallback = (req, res, next) => {
    passport.authenticate("kakao", async (err, user) => {
      if (err) return next(err);
      const userFindId = await User.findOne({ kakaoId: user.kakaoId });
      const token = userFindId.createJWT();
      res.status(StatusCodes.OK).json({ token });
    })(req, res, next);
  };