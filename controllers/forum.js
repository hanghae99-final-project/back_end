const Forum = require("../models/forum");
const { StatusCodes } = require("http-status-codes");

// 게시글 전체 가져오기
exports.getForum = async (req, res) => {
  const result = await Forum.getForum(undefined);
  return res.status(StatusCodes.OK).json({result});
};

// 내가 쓴 게시글만 가져오기
exports.getMyForum = async (req, res) => {
  const user = req.locals;
  const result = await Forum.getForum(user);
  return res.status(StatusCodes.OK).json({ result });
};

// 게시글 하나만 보기
exports.detailForum = async (req, res) => {
    const {id} = req.params;
    const result = await Forum.detailForum(id);
    return res.status(StatusCodes.OK).json({result});
  };

// 게시글 작성하기
exports.postForum = async (req, res) => {
  const user = req.locals;
  const {content} = req.body;
  if(!content){
    throw new Error("글의 내용이 없습니다.");
  }
  const result = await Forum.postForum(content, user);

  return res.status(StatusCodes.OK).json({result});
};

// 게시글 수정하기
exports.putForum = async (req, res) => {
  const {id} = req.params;
  const user = req.locals;
  const {content} = req.body;
  if(!content){
    throw new Error("글의 내용이 없습니다.");
  }
  if(!id){
    throw new Error("글의 id가 없습니다.");
  }
  const result = await Forum.putForum(id, content, user);

  return res.status(StatusCodes.OK).json({ result });
};

// 게시글 삭제하기
exports.deleteForum = async (req, res) => {
  const {id} = req.params;
  const user = req.locals;
  if(!id){
    throw new Error("글의 id가 없습니다.");
  }
  const result = await Forum.deleteForum(id, user);

  return res.status(StatusCodes.OK).json({ result });
};
