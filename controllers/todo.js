const todoService = require("../service/todo");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

// todo 가져오기 함수
exports.getTodo = async (req, res) => {
  const user = req.locals;
  const day = req.params.day;
  const regex = /\d{4}-\d{2}-\d{2}/;
  if (!regex.test(day)) {
    throw new BadRequestError("날짜 형식이 틀립니다.");
  }
  const result = await todoService.getTodo(day, user); //userId
  res.status(StatusCodes.OK).json({ todoArr: result });
};

// todo 생성 함수
exports.createTodo = async (req, res) => {
  const user = req.locals;
  const { work, isDone, color } = req.body;
  if (!work || !color || typeof isDone !== "boolean") {
    throw new BadRequestError("입력 값이 없습니다.");
  }
  const result = await todoService.createTodo(work, isDone, color, user);
  res.status(StatusCodes.OK).json(result);
};

// todo 수정하기
exports.putTodo = async (req, res) => {
  const user = req.locals;
  const todoId = req.params.id;
  const { work, color, isDone } = req.body;
  let result = undefined;
  if (!todoId) {
    throw new BadRequestError("todo Id가 없습니다.");
  }
  if (typeof isDone !== "undefined") {
    if (typeof isDone === "boolean") {
      result = await todoService.isDoneTodo(todoId, isDone, user);
    } else {
      throw new BadRequestError("isDone이 boolean 값이 아닙니다.");
    }
  } else {
    if (!work || !color) {
      throw new BadRequestError("입력 값이 없습니다.");
    } else if (typeof(work) !== "string" || typeof(color) !== "string") {
      throw new BadRequestError("work, color가 문자열이 아닙니다.");
    } else {
      result = await todoService.putTodo(todoId, work, color, user);
    }
  }
  res.status(StatusCodes.OK).json(result);
};

//todo 삭제하기
exports.deleteTodo = async (req, res) => {
  const user = req.locals;
  const todoId = req.params.id;
  if (!todoId) {
    throw new BadRequestError("todo Id가 없습니다.");
  }
  const result = await todoService.deleteTodo(todoId, user); //userId
  res.status(StatusCodes.OK).json({ success: result });
};