const studyingModels = require("../models/studying");

exports.getStudyingCount = async () => {
    const getStudyingPeople = await studyingModels.getStudying();
    return getStudyingPeople.length;
  };