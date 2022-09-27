const Todo = require("../schemas/todo");
const { DateTime } = require("luxon");

exports.getTodo = async (day, user) => {
  const dayStart = new Date(day.startOf("days"));
  const dayEnd = new Date(day.endOf("days"));
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: dayStart,
          $lte: dayEnd,
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  return existedTodo;
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

exports.deleteTodo = async (existedTodo) => {
  await Todo.deleteOne(existedTodo);
};
