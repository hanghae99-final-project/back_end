const Bookmark = require("../models/bookmark");
const { StatusCodes } = require("http-status-codes");

// 내가 저장한 북마크 가져오기
exports.getMyBookmark = async (req, res) => {
    let result =undefined;
  const user = req.locals;
  const bookmarkData = await Bookmark.getMyBookmark(user);

  result = bookmarkData.map(bookmark=>{
    return {
        forumId : bookmark.forumId._id,
        content : bookmark.forumId.content,
        createdAt : bookmark.forumId.createdAt
    }
  });
  return res.status(StatusCodes.OK).json({ result });
};

// 북마크 추가하기
exports.postMyBookmark = async (req, res) => {
  const { id } = req.params;
  const user = req.locals;
  const result = await Bookmark.postMyBookmark(id, user);
  return res.status(StatusCodes.OK).json({ result });
};

// 북마크 삭제하기
exports.deleteMyBookmark = async (req, res) => {
    const { id } = req.params;
    const user = req.locals;
    const result = await Bookmark.deleteMyBookmark(id, user);
    return res.status(StatusCodes.OK).json({ result });
  };
