const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //check header
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new UnauthenticatedError("로그인이 필요합니다.");
    }
    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user to the job routes
    const user = await User.findOne({ kakaoId: payload.userId });

    req.locals = user;

    next();
  } catch (error) {
    throw new UnauthenticatedError("로그인이 필요합니다.");
  }
};
module.exports = auth;
