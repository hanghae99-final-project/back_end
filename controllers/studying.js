const Studying = require("../service/studying");
const { StatusCodes } = require("http-status-codes");

exports.getStudyingCount = async (req, res) => {
  const studyingCount = await Studying.getStudyingCount();

  return res.status(StatusCodes.OK).json({ studyingCount });
};
