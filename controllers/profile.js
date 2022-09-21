const profileService = require("../service/profile");
const userService = require("../service/user");
const { StatusCodes } = require("http-status-codes");
const boom = require("@hapi/boom");

exports.getProfile = async (req, res) => {
  const user = req.locals;
  const myProfile = await profileService.getProfile(user);
  return res.status(StatusCodes.OK).json(myProfile);
};

exports.putProfile = async (req, res) => {
  const user = req.locals;
  const { nickname, ageGroup, specialty } = req.body;

  await userService.nicknameCheck(nickname);
  await userService.ageGroupCheck(ageGroup);
  await userService.specialtyCheck(specialty);

  const check = await profileService.putProfile(
    user,
    nickname,
    ageGroup,
    specialty
  );
  if (check) {
    return res.status(StatusCodes.OK).json({ success: check });
  } else {
    throw boom.conflict("닉네임이 중복 됩니다.");
  }
};

exports.postSpec = async (req, res) => {
  const user = req.locals;
  const { education, career, year, experience } = req.body;

  if (!career || !year || !experience || !education) {
    throw boom.badRequest("입력 값이 없습니다.");
  }
  if (education !== "학력" && education !== "경력") {
    throw boom.badRequest("education 카테고리 입력 오류");
  }
  if (typeof career !== "string") {
    throw boom.badRequest("career 값이 형식에 맞지 않습니다.");
  }
  if (typeof experience !== "string") {
    throw boom.badRequest("expererience 값이 형식에 맞지 않습니다.");
  }
  if (typeof year !== "string") {
    throw boom.badRequest("year가 형식에 맞지 않습니다.");
  }

  const createdSpec = await profileService.postSpec(
    user,
    education,
    career,
    year,
    experience
  );
  return res.status(StatusCodes.CREATED).json(createdSpec);
};

exports.putSpec = async (req, res) => {
  const user = req.locals;
  const specId = req.params.id;
  const { education, career, year, experience } = req.body;

  if (!specId) {
    throw boom.badRequest("specId가 없습니다.");
  }
  if (!career || !year || !experience || !education) {
    throw boom.badRequest("입력 값이 없습니다.");
  }
  if (education !== "학력" && education !== "경력") {
    throw boom.badRequest("education 카테고리 입력 오류");
  }
  if (typeof career !== "string") {
    throw boom.badRequest("career 값이 형식에 맞지 않습니다.");
  }
  if (typeof experience !== "string") {
    throw boom.badRequest("expererience 값이 형식에 맞지 않습니다.");
  }
  if (typeof year !== "string") {
    throw boom.badRequest("year가 형식에 맞지 않습니다.");
  }

  const result = await profileService.putSpec(
    user,
    specId,
    education,
    career,
    year,
    experience
  );
  return res.status(StatusCodes.OK).json({ success: result });
};

exports.deleteSpec = async (req, res) => {
  const user = req.locals;
  const specId = req.params.id;

  if (!specId) {
    throw boom.badRequest("specId가 없습니다.");
  }

  const result = await profileService.deleteSpec(user, specId);
  return res.status(StatusCodes.OK).json({ success: result });
};

exports.getDday = async (req, res) => {
  const user = req.locals;
  const myDday = await profileService.getDday(user);
  return res.status(StatusCodes.OK).json({ myDday });
};

exports.postDday = async (req, res) => {
  const user = req.locals;
  const { deadline, content } = req.body;
  const regex = /\d{4}-\d{2}-\d{2}/;
  if (!deadline || !content) {
    throw boom.badRequest("dday 또는 내용이 들어가 있지 않습니다.");
  }
  if (!regex.test(deadline)) {
    throw boom.badRequest("날짜 형식이 틀립니다.");
  }

  const createdDday = await profileService.postDday(user, deadline, content);
  return res.status(StatusCodes.CREATED).json(createdDday);
};

exports.putDday = async (req, res) => {
  const user = req.locals;
  const ddayId = req.params.id;
  const { deadline, content } = req.body;
  const regex = /\d{4}-\d{2}-\d{2}/;
  if (!ddayId) {
    throw boom.badRequest("dday Id가 없습니다.");
  }
  if (!deadline || !content) {
    throw boom.badRequest("dday 또는 내용이 들어가 있지 않습니다.");
  }
  if (!regex.test(deadline)) {
    throw boom.badRequest("날짜 형식이 틀립니다.");
  }

  const result = await profileService.putDday(user, ddayId, deadline, content);
  return res.status(StatusCodes.OK).json({ success: result });
};

exports.deleteDday = async (req, res) => {
  const user = req.locals;
  const ddayId = req.params.id;
  if (!ddayId) {
    throw boom.badRequest("dday Id가 없습니다.");
  }

  const result = await profileService.deleteDday(user, ddayId);
  return res.status(StatusCodes.OK).json({ success: result });
};

exports.getNickCheck = async (req, res) => {
  const user = req.locals;
  const { nickname } = req.params;
  if (typeof nickname !== "string") {
    throw boom.badRequest("nickname 형식이 맞지 않습니다.");
  }

  const result = await profileService.getNickCheck(user, nickname);
  return res.status(StatusCodes.OK).json({ ok: result });
};
