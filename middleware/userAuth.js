const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { localsName } = require("ejs");

const auth = async (req, res, next) => {
  //check header
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "로그인이 필요합니다." });
    }
    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user to the job routes
    const user = await User.findOne({ kakaoId: payload.userId });

    req.locals = user;

    next();
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "로그인을 먼저 해주세요." });
  }
};
module.exports = auth;
