const Profile = require("../models/profile");
const { profileSchema } = require("../models/userValidation");
const { StatusCodes } = require("http-status-codes");

exports.getProfile = async (req, res) => {
  const user = req.locals;
  const myProfile = await Profile.getProfile(user);
  return res.status(StatusCodes.OK).json(myProfile);
};

exports.putProfile = async (req, res) => {
  const user = req.locals;
  const { nickname, ageGroup, specialty } = await profileSchema.validateAsync(
    req.body
  );

  const check = await Profile.putProfile(user, nickname, ageGroup, specialty);
  if (check) {
    return res.status(StatusCodes.OK).json({ success: check });
  } else {
    throw new Error("닉네임이 중복 됩니다.");
  }
};

exports.postSpec = async (req, res) => {
  const user = req.locals;
  const { education, career, year, experience } = req.body;

  if (education !== "학력" && education !== "경력") {
    throw new Error("education 카테고리 입력 오류");
  }

  const createdSpec = await Profile.postSpec(
    user,
    education,
    career,
    year,
    experience
  );
  return res.status(StatusCodes.OK).json(createdSpec);
};

exports.putSpec = async (req, res) => {
  const user = req.locals;
  const specId = req.params.id;
  const { education, career, year, experience } = req.body;

  const result = await Profile.putSpec(
    user,
    specId,
    education,
    career,
    year,
    experience
  );
  return res.status(StatusCodes.OK).json({success : result});
};

exports.deleteSpec = async (req, res) => {
  const user = req.locals;
  const specId = req.params.id;

  const result = await Profile.deleteSpec(user, specId);
  return res.status(StatusCodes.OK).json({ success: result });
};

exports.getDday = async (req, res) => {
  const user = req.locals;
  const myDday = await Profile.getDday(user);
  myDday.sort((a,b)=> new Date(b.deadline).getTime()- new Date(a.deadline).getTime());
  return res.status(StatusCodes.OK).json({myDday});
};

exports.postDday = async (req, res) => {
  const user = req.locals;
  const { deadline, content } = req.body;

  const createdDday = await Profile.postDday(user, deadline, content);
  return res.status(StatusCodes.OK).json(createdDday);
};

exports.putDday = async (req, res) => {
  const user = req.locals;
  const ddayId = req.params.id;
  const { deadline, content } = req.body;

  const result = await Profile.putDday(user, ddayId, deadline, content);
  return res.status(StatusCodes.OK).json({success: result});
};

exports.deleteDday = async (req, res) => {
  const user = req.locals;
  const ddayId = req.params.id;

  const result = await Profile.deleteDday(user, ddayId);
  return res.status(StatusCodes.OK).json({ success: result });
};