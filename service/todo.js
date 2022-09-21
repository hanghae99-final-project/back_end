const todoModels = require("../models/todo");
const moment = require("moment");

// todo 가져오기
exports.getTodo = async (day, user) => {
  const existedTodo = await todoModels.getTodo(day, user); //userId
  if (existedTodo) {
    return existedTodo.todoArr;
  } else {
    return `${day} 에 저장된 할일 리스트가 없습니다.`;
  }
};

// todo 생성하기
exports.createTodo = async (work, isDone, color, user) => {
  const today = moment();
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
  const today = moment();
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
      throw new Error("todo id가 없거나 일치하지 않습니다.");
    }
    const result = await todoModels.saveTodo(existedTodo);
    return result.todoArr[Number(todoArrIdx)];
  } else {
    throw new Error("todo에 데이터가 없습니다.");
  }
};

// todo 수정하기
exports.putTodo = async (todoId, work, color, user) => {
  const today = moment();
  let todoArrIdx = false;
  const existedTodo = await todoModels.getTodo(today, user);

  if (existedTodo) {
    existedTodo.todoArr.map((todo, idx) => {
      if (todo._id.equals(todoId)) {
        console.log(todoId);
        todoArrIdx = idx.toString();
        existedTodo.todoArr[idx].work = work;
        existedTodo.todoArr[idx].color = color;
      }
    });
    if (!todoArrIdx) {
      throw new Error("todo id가 없거나 일치하지 않습니다.");
    }
    const result = await todoModels.saveTodo(existedTodo);
    return result.todoArr[Number(todoArrIdx)];
  } else {
    throw new Error("todo에 데이터가 없습니다.");
  }
};

// todo 삭제하기
exports.deleteTodo = async (todoId, user) => {
  const today = moment();
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
      throw new Error("todo id가 없거나 일치하지 않습니다.");
    }
    await todoModels.saveTodo(existedTodo);
    return true;
  } else {
    throw new Error("todo에 데이터가 없습니다.");
  }
};
