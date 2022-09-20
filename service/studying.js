const Studying = require("../models/studying");

exports.getStudyingCount = async () => {
    const getStudyingPeople = await Studying.getStudying();
    return getStudyingPeople.length;
  };