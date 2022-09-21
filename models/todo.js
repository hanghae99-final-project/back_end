const Todo = require("../schemas/todo");
const moment = require("moment");

exports.getTodo = async (dayData, user) => {
  const dayStart = moment(dayData).startOf("day");
  const dayEnd = moment(dayStart).endOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: dayStart.toDate(),
          $lte: dayEnd.toDate(),
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

exports.createTodo = async (work, isDone, color, user) => {
  const result = await Todo.create({
    userId: user._id,
    todoArr: [{ work, isDone, color }],
  });
  return result;
};

exports.saveTodo = async (existedTodo) => {
  const result = await existedTodo.save();
  return result;
};
