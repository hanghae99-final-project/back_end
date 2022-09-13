const Studying = require("../models/studying");
const { StatusCodes } = require("http-status-codes");

exports.getStudyingCount = async (req, res) => {
  const getStudyingPeople = await Studying.getStudying();

  return res
    .status(StatusCodes.OK)
    .json({ studyingCount: getStudyingPeople.length });
};
