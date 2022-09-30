const studyingModels = require("../models/studying.model");

exports.getStudyingCount = async () => {
  const getStudyingPeople = await studyingModels.getStudying();
  return getStudyingPeople.length;
};
