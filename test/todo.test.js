const Todo = require("../service/todo.service");
const TodoModels = require("../models/todo.model");
const ObjectId = require("mongodb").ObjectId;

describe("login한 user", () => {
  const user = {
    _id: 1234567,
    kakaoId: 1234,
    targetTime: 120,
    nickname: "김똥깡",
    ageGroup: "20대",
    specialty: "의료",
    createdAt: "2022-09-26T10:53:05.501+00:00",
  };

  test("getTodo : 투두리스트 가져오기", async () => {
    TodoModels.getTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: 1,
          work: "111",
          isDone: false,
          color: "111",
        },
      ],
    }));
    const result = await Todo.getTodo("2022-09-27", user);
    expect(result).toEqual([
      {
        _id: 1,
        work: "111",
        isDone: false,
        color: "111",
      },
    ]);
  });

  test("getTodo : 투두리스트 아무것도 없을 때", async () => {
    TodoModels.getTodo = jest.fn(() => {});
    const result = await Todo.getTodo("2022-09-27", user);
    expect(result).toEqual([]);
  });

  test("createTodo : 오늘자 투두리스트 생성할 때", async () => {
    TodoModels.getTodo = jest.fn(() => {});
    TodoModels.createTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: 1234,
          work: "asd",
          isDone: false,
          color: "12345",
        },
      ],
    }));
    const result = await Todo.createTodo("asd", false, "12345", user);
    expect(result).toEqual({
      _id: 1234,
      work: "asd",
      isDone: false,
      color: "12345",
    });
  });

  test("createTodo : 오늘자 투두리스트 추가할 때", async () => {
    TodoModels.getTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: 1,
          work: "111",
          isDone: false,
          color: "111",
        },
      ],
    }));
    TodoModels.saveTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: 1,
          work: "111",
          isDone: false,
          color: "111",
        },
        {
          _id: 2,
          work: "222",
          isDone: false,
          color: "222",
        },
      ],
    }));
    const result = await Todo.createTodo("222", false, "222", user);
    expect(result).toEqual({
      _id: 2,
      work: "222",
      isDone: false,
      color: "222",
    });
  });

  test("isDoneTodo : 오늘 할일 완료 유무 수정할 때", async () => {
    const objectId = new ObjectId(1);
    TodoModels.getTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: objectId,
          work: "111",
          isDone: false,
          color: "111",
        },
      ],
    }));
    TodoModels.saveTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: objectId,
          work: "111",
          isDone: true,
          color: "111",
        },
      ],
    }));
    const result = await Todo.isDoneTodo(objectId, true, user);
    expect(result).toEqual({
      _id: objectId,
      work: "111",
      isDone: true,
      color: "111",
    });
  });

  test("isDoneTodo : 오늘 할일 id가 일치하지 않을 때", async () => {
    const objectId1 = new ObjectId(1);
    const objectId2 = new ObjectId(2);
    TodoModels.getTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: objectId1,
          work: "111",
          isDone: false,
          color: "111",
        },
      ],
    }));
    TodoModels.saveTodo = jest.fn(() => {});
    try {
      await Todo.isDoneTodo(objectId2, true, user);
    } catch (err) {
      expect(err.message).toEqual("todo id가 없거나 일치하지 않습니다.");
    }
  });

  test("putTodo : 오늘 할일 수정할 때", async () => {
    const objectId = new ObjectId(1);
    TodoModels.getTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: objectId,
          work: "111",
          isDone: false,
          color: "111",
        },
      ],
    }));
    TodoModels.saveTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: objectId,
          work: "112",
          isDone: true,
          color: "112",
        },
      ],
    }));
    const result = await Todo.putTodo(objectId, "112", "112", user);
    expect(result).toEqual({
      _id: objectId,
      work: "112",
      isDone: true,
      color: "112",
    });
  });

  test("putTodo : 오늘 할일 id가 일치하지 않을 때", async () => {
    const objectId1 = new ObjectId(1);
    const objectId2 = new ObjectId(2);
    TodoModels.getTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: objectId1,
          work: "111",
          isDone: false,
          color: "111",
        },
      ],
    }));
    try {
      await Todo.putTodo(objectId2, "112", "112", user);
    } catch (err) {
      expect(err.message).toEqual("todo id가 없거나 일치하지 않습니다.");
    }
  });

  test("deleteTodo : 오늘 할일 삭제할 때", async () => {
    const objectId = new ObjectId(1);
    TodoModels.getTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: objectId,
          work: "111",
          isDone: false,
          color: "111",
        },
      ],
    }));
    TodoModels.saveTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [],
    }));
    TodoModels.deleteTodo = jest.fn(() => {});
    const result = await Todo.deleteTodo(objectId, user);
    expect(result).toBeTruthy();
  });

  test("deleteTodo : 오늘 할일 id가 일치하지 않을 때", async () => {
    const objectId1 = new ObjectId(1);
    const objectId2 = new ObjectId(2);
    TodoModels.getTodo = jest.fn(() => ({
      userId: 1234567,
      todoArr: [
        {
          _id: objectId1,
          work: "111",
          isDone: false,
          color: "111",
        },
      ],
    }));
    try {
      await Todo.deleteTodo(objectId2, user);
    } catch (err) {
      expect(err.message).toEqual("todo id가 없거나 일치하지 않습니다.");
    }
  });
});
