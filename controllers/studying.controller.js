const studyingService = require("../service/studying.service");
const { StatusCodes } = require("http-status-codes");

exports.getStudyingCount = async (req, res) => {
  const studyingCount = await studyingService.getStudyingCount();

  return res.status(StatusCodes.OK).json({ studyingCount });
};
