const Profile = require("../service/profile");
const { StatusCodes } = require("http-status-codes");

exports.getProfile = async (req, res) => {
  const user = req.locals;
  const myProfile = await Profile.getProfile(user);
  return res.status(StatusCodes.OK).json(myProfile);
};

exports.putProfile = async (req, res) => {
  const user = req.locals;
  const { nickname, ageGroup, specialty } = req.body;
  if(!nickname || !ageGroup || !specialty){
    throw new Error("입력 값이 없습니다.");
  }
  if (typeof(nickname) !== "string"){
    throw new Error("nickname 값이 형식에 맞지 않습니다.");
  }
  if (typeof(ageGroup) !== "string"){
    throw new Error("ageGroup 값이 형식에 맞지 않습니다.");
  }
  if (typeof(specialty) !== "string"){
    throw new Error("specialty 형식에 맞지 않습니다.");
  }

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

  if(!career || !year || !experience || !education){
    throw new Error("입력 값이 없습니다.");
  }
  if (education !== "학력" && education !== "경력") {
    throw new Error("education 카테고리 입력 오류");
  }
  if (typeof(career) !== "string"){
    throw new Error("career 값이 형식에 맞지 않습니다.");
  }
  if (typeof(experience) !== "string"){
    throw new Error("expererience 값이 형식에 맞지 않습니다.");
  }
  if (typeof(year) !== "string"){
    throw new Error("year가 형식에 맞지 않습니다.");
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

  if(!specId){
    throw new Error("specId가 없습니다.");
  }
  if(!career || !year || !experience || !education){
    throw new Error("입력 값이 없습니다.");
  }
  if (education !== "학력" && education !== "경력") {
    throw new Error("education 카테고리 입력 오류");
  }
  if (typeof(career) !== "string"){
    throw new Error("career 값이 형식에 맞지 않습니다.");
  }
  if (typeof(experience) !== "string"){
    throw new Error("expererience 값이 형식에 맞지 않습니다.");
  }
  if (typeof(year) !== "string"){
    throw new Error("year가 형식에 맞지 않습니다.");
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
  return res.status(StatusCodes.OK).json({myDday});
};

exports.postDday = async (req, res) => {
  const user = req.locals;
  const { deadline, content } = req.body;
  const regex = /\d{4}-\d{2}-\d{2}/;
  if(!deadline || !content){
    throw new Error("dday 또는 내용이 들어가 있지 않습니다.");
  }
  if (!regex.test(deadline)) {
    throw new Error("날짜 형식이 틀립니다.");
  }

  const createdDday = await Profile.postDday(user, deadline, content);
  return res.status(StatusCodes.OK).json(createdDday);
};

exports.putDday = async (req, res) => {
  const user = req.locals;
  const ddayId = req.params.id;
  const { deadline, content } = req.body;
  const regex = /\d{4}-\d{2}-\d{2}/;
  if(!ddayId){
    throw new Error("dday Id가 없습니다.")
  }
  if(!deadline || !content){
    throw new Error("dday 또는 내용이 들어가 있지 않습니다.");
  }
  if (!regex.test(deadline)) {
    throw new Error("날짜 형식이 틀립니다.");
  }

  const result = await Profile.putDday(user, ddayId, deadline, content);
  return res.status(StatusCodes.OK).json({success: result});
};

exports.deleteDday = async (req, res) => {
  const user = req.locals;
  const ddayId = req.params.id;
  if(!ddayId){
    throw new Error("dday Id가 없습니다.");
  }

  const result = await Profile.deleteDday(user, ddayId);
  return res.status(StatusCodes.OK).json({ success: result });
};