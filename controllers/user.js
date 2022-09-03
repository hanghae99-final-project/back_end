const passport = require("passport");
const { StatusCodes } = require("http-status-codes");

exports.main = (req, res) => {
    res.send("Hello World")
}

exports.kakaoCallback = (req, res, next) => {
    passport.authenticate("kakao", async (err, user) => {
      if (err) return next(err);

      res.status(StatusCodes.OK).json({ message:"성공" });
    })(req, res, next);
  };