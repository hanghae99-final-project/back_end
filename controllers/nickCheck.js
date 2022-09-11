const NickCheck = require("../models/nickCheck");
const { StatusCodes } = require("http-status-codes");

exports.getNickCheck = async (req, res) => {
  const user = req.locals;
  const { nickname } = await NickCheck.nicknameJoiCheck.validateAsync(
    req.params
  );
  const result = await NickCheck.getNickCheck(user, nickname);
  return res.status(StatusCodes.OK).json({ ok: result });
};
