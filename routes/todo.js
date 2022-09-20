const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middleware/async");
const TodoController = require("../controllers/todo");

router
  .route("/")
  .post(asyncWrapper(TodoController.createTodo));
router.route("/:day")
  .get(asyncWrapper(TodoController.getTodo));
router.route("/:id")
  .put(asyncWrapper(TodoController.putTodo))
  .delete(asyncWrapper(TodoController.deleteTodo));

module.exports = router;