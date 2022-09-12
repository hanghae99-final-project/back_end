const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/todo");

// userId와 날짜를 받아올지
router
  .route("/")
  .post(TodoController.createTodo);
  
router.route("/:day")
  .get(TodoController.getTodo);

router.route("/:id")
  .put(TodoController.putTodo)
  .delete(TodoController.deleteTodo);

module.exports = router;