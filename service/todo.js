const todoModels = require("../models/todo");
const { DateTime } = require("luxon");
const { notFoundError } = require("../errors");

// todo 가져오기
exports.getTodo = async (dayData, user) => {
  day = DateTime.fromISO(dayData);
  const existedTodo = await todoModels.getTodo(day, user); //userId
  if (existedTodo) {
    return existedTodo.todoArr;
  } else {
    return [];
  }
};

// todo 생성하기
exports.createTodo = async (work, isDone, color, user) => {
  const today = DateTime.now();
  let result = {};
  const existedTodo = await todoModels.getTodo(today, user);

  if (existedTodo) {
    existedTodo.todoArr.push({ work, isDone, color });
    result = await todoModels.saveTodo(existedTodo);
  } else {
    result = await todoModels.createTodo(work, isDone, color, user);
  }
  return result.todoArr[result.todoArr.length - 1];
};

// todo 완료 유무 수정하기
exports.isDoneTodo = async (todoId, isDone, user) => {
  const today = DateTime.now();
  let todoArrIdx = false;
  const existedTodo = await todoModels.getTodo(today, user);

  if (existedTodo) {
    existedTodo.todoArr.map((todo, idx) => {
      if (todo._id.equals(todoId)) {
        todoArrIdx = idx.toString();
        existedTodo.todoArr[idx].isDone = isDone;
      }
    });
    if (!todoArrIdx) {
      throw new notFoundError("todo id가 없거나 일치하지 않습니다.");
    }
    const result = await todoModels.saveTodo(existedTodo);
    return result.todoArr[Number(todoArrIdx)];
  } else {
    throw new notFoundError("todo에 데이터가 없습니다.");
  }
};

// todo 수정하기
exports.putTodo = async (todoId, work, color, user) => {
  const today = DateTime.now();
  let todoArrIdx = false;
  const existedTodo = await todoModels.getTodo(today, user);

  if (existedTodo) {
    existedTodo.todoArr.map((todo, idx) => {
      if (todo._id.equals(todoId)) {
        todoArrIdx = idx.toString();
        existedTodo.todoArr[idx].work = work;
        existedTodo.todoArr[idx].color = color;
      }
    });
    if (!todoArrIdx) {
      throw new notFoundError("todo id가 없거나 일치하지 않습니다.");
    }
    const result = await todoModels.saveTodo(existedTodo);
    return result.todoArr[Number(todoArrIdx)];
  } else {
    throw new notFoundError("todo에 데이터가 없습니다.");
  }
};

// todo 삭제하기
exports.deleteTodo = async (todoId, user) => {
  const today = DateTime.now();
  let todoArrIdx = false;
  const existedTodo = await todoModels.getTodo(today, user);
  if (existedTodo) {
    existedTodo.todoArr.map((todo, idx) => {
      if (todo._id.equals(todoId)) {
        todoArrIdx = idx.toString();
        existedTodo.todoArr.splice(idx, 1);
      }
    });
    if (!todoArrIdx) {
      throw new notFoundError("todo id가 없거나 일치하지 않습니다.");
    }
    await todoModels.saveTodo(existedTodo);
    if (!existedTodo.todoArr.length) {
      await todoModels.deleteTodo(existedTodo);
    }
    return true;
  } else {
    throw new notFoundError("todo에 데이터가 없습니다.");
  }
};
