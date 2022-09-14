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

  if(!specId){
    throw new Error("specId가 없습니다.");
  }
  if (education !== "학력" && education !== "경력" || !education) {
    throw new Error("education 카테고리 입력 오류");
  }
  if(!career || !year || !experience){
    throw new Error("입력 값이 없습니다.");
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

  if (education !== "학력" && education !== "경력" || !education) {
    throw new Error("education 카테고리 입력 오류");
  }
  if(!career || !year || !experience){
    throw new Error("입력 값이 없습니다.");
  }

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

  if(!specId){
    throw new Error("specId가 없습니다.");
  }

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
  if(!deadline || !content){
    throw new Error("dday 또는 내용이 들어가 있지 않습니다.");
  }

  const createdDday = await Profile.postDday(user, deadline, content);
  return res.status(StatusCodes.OK).json(createdDday);
};

exports.putDday = async (req, res) => {
  const user = req.locals;
  const ddayId = req.params.id;
  const { deadline, content } = req.body;
  if(!ddayId){
    throw new Error("dday Id가 없습니다.")
  }
  if(!deadline || !content){
    throw new Error("dday 또는 내용이 들어가 있지 않습니다.");
  }

  const result = await Profile.putDday(user, ddayId, deadline, content);
  return res.status(StatusCodes.OK).json({success: result});
};

exports.deleteDday = async (req, res) => {
  const user = req.locals;
  const ddayId = req.params.id;
  if(!ddayId){
    throw new Error("dday Id가 없습니다.")
  }

  const result = await Profile.deleteDday(user, ddayId);
  return res.status(StatusCodes.OK).json({ success: result });
};