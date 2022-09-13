const Forum = require("../schemas/forum");
const Bookmark = require("../schemas/bookmark");
const { StatusCodes } = require("http-status-codes");

// 전체 게시글 or 내 게시글 가져오기
exports.getForum = async (user) => {
  let result = undefined;
  // uesr를 받아왔을시 내 게시글만 가져오기
  if (user) {
    result = await Forum.find({ userId: user._id }).populate("userId");
    // user를 안받을 시 전체 게시글 가져오기
  } else {
    result = await Forum.find({}).populate("userId");
  }
  if (!result.length) {
    return "게시글이 존재하지 않습니다.";
  } else {
    result = result.map((forum) => {
      return {
        _id: forum._id,
        nickname: forum.userId.nickname,
        ageGroup: forum.userId.ageGroup,
        userCategory: forum.userId.specialty,
        content: forum.content,
      };
    });
  }
  return result;
};

// 게시글 한개 가져오기
exports.detailForum = async (forumId) => {
  let result = undefined;
  const resultData = await Forum.findOne({ _id: forumId }).populate("userId");
  if (!resultData) {
    throw new Error("게시글이 존재하지 않습니다.");
  } else {
    result = result = {
      _id: resultData._id,
      nickname: resultData.userId.nickname,
      ageGroup: resultData.userId.ageGroup,
      userCategory: resultData.userId.specialty,
      content: resultData.content,
    };
  }
  return result;
};

// 게시글 작성하기
exports.postForum = async (content, user) => {
  const createdFourm = await Forum.create({
    userId: user._id,
    content,
  });
  return createdFourm;
};

// 게시글 수정하기 (내 게시글만 수정 가능)
exports.putForum = async (id, content, user) => {
  const existedForum = await Forum.findOne({ _id: id }).populate("userId");
  if (!existedForum) {
    throw new Error("게시글이 존재하지 않습니다.");
  } else {
    if (existedForum.userId.kakaoId === user.kakaoId) {
      existedForum.content = content;
      await existedForum.save();
      return true;
    } else {
      throw new Error("자신이 쓴 글이 아닙니다.");
    }
  }
};

// 게시글 삭제하기 (내 게시글만 삭제 가능)
exports.deleteForum = async (id, user) => {
  const existedForum = await Forum.findOne({ _id: id }).populate("userId");
  if (!existedForum) {
    throw new Error("게시글이 존재하지 않습니다.");
  } else {
    if (existedForum.userId.kakaoId === user.kakaoId) {
      await Forum.deleteOne({ _id: id });
      return true;
    } else {
      throw new Error("자신이 쓴 글이 아닙니다.");
    }
  }
};
