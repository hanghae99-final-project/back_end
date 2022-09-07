const Todo = require("../schemas/todo");
const moment = require("moment");

exports.createTodo = async (work, isDone, color, user) => {
  const today = moment().startOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: today.toDate(),
          $lte: moment(today).endOf("day").toDate(),
        },
      },
      {
        userId: user._id,
      },
    ],
  });

  if (existedTodo) {
    existedTodo.todoArr.push({ work, isDone, color });
    const result = await existedTodo.save();
    return result.todoArr[result.todoArr.length - 1];
  } else {
    const result = await Todo.create({ userId : user._id, todoArr: [{ work, isDone, color }] });
    return result.todoArr[result.todoArr.length - 1];
  }
};

exports.getTodo = async (dayData, user) => {
  const day = moment(dayData).startOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: day.toDate(),
          $lte: moment(day).endOf("day").toDate(),
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  if (existedTodo) {
    return existedTodo;
  } else {
    return `${dayData} 에 저장된 할일 리스트가 없습니다.`;
  }
};

exports.putTodo = async (todoId, work, color, user) => {
  const today = moment().startOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: today.toDate(),
          $lte: moment(today).endOf("day").toDate(),
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  let todoArrIdx = undefined;
  if (existedTodo) {
    existedTodo.todoArr.map((todo, idx) => {
      if (todo._id.equals(todoId)) {
        todoArrIdx = idx;
      }
    });
    existedTodo.todoArr[todoArrIdx].work = work;
    existedTodo.todoArr[todoArrIdx].color = color;
    const result = await existedTodo.save();
    return result.todoArr[todoArrIdx];
  } else {
    throw new Error("데이터가 없습니다.");
  }
};

exports.isDoneTodo = async (todoId, isDone, user) => {
  const today = moment().startOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: today.toDate(),
          $lte: moment(today).endOf("day").toDate(),
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  let todoArrIdx = undefined;
  if (existedTodo) {
    existedTodo.todoArr.map((todo, idx) => {
      if (todo._id.equals(todoId)) {
        todoArrIdx = idx;
      }
    });
    existedTodo.todoArr[todoArrIdx].isDone = isDone;
    const result = await existedTodo.save();
    return result.todoArr[todoArrIdx];
  } else {
    throw new Error("데이터가 없습니다.");
  }
};

exports.deleteTodo = async (todoId, user) => {
  const today = moment().startOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: today.toDate(),
          $lte: moment(today).endOf("day").toDate(),
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  let todoArrIdx = undefined;
  if (existedTodo) {
    existedTodo.todoArr.map((todo, idx) => {
      if (todo._id.equals(todoId)) {
        todoArrIdx = idx;
      }
    });
    existedTodo.todoArr.splice(todoArrIdx, 1);
    await existedTodo.save();
    return true;
  } else {
    throw new Error("데이터가 없습니다.");
  }
};
