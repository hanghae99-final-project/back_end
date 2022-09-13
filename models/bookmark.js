const Bookmark = require("../schemas/bookmark");
const { StatusCodes } = require("http-status-codes");

// 내가 저장한 북마크 가져오기
exports.getMyBookmark = async (user) => {
  // userId로 검색 후 forumId로 조인함
  const existedBookmark = await Bookmark.find({ userId: user._id }).populate(
    "forumId"
  );
  if (!existedBookmark.length) {
    return "저장한 북마크가 존재하지 않습니다.";
  }
  return existedBookmark;
};

// 추가하기
exports.postMyBookmark = async (id, user) => {
  let result = undefined;
  const existedBookmark = await Bookmark.findOne({
    $and: [{ userId: user._id }, { forumId: id }],
  });
  // 똑같은 글이 북마크에 이미 존재하므로 에러 발생
  if (existedBookmark) {
    throw new Error("기존에 저장한 북마크가 있습니다.");
  } else {
    await Bookmark.create({
      userId: user._id,
      forumId: id,
    }).then(() => {
      result = true;
    });
  }
  return result;
};

// 북마크 삭제하기
exports.deleteMyBookmark = async (id, user) => {
  let result = undefined;
  const existedBookmark = await Bookmark.findOne({
    $and: [{ userId: user._id }, { forumId: id }],
  });
  if (existedBookmark) {
    await Bookmark.deleteOne({
      $and: [{ userId: user._id }, { forumId: id }],
    }).then(() => {
      result = true;
    });
  // 저장되어 있지 않은 북마크를 삭제할 경우 에러 발생
  } else {
    throw new Error("북마크에 저장되어 있지 않습니다.");
  }
  return result;
};
