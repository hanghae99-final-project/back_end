const express = require("express");
const router = express.Router();
const Forum = require("../controllers/forum");

const asyncWrapper = require("../middleware/async");

router
  .route("/")
  .get(asyncWrapper(Forum.getForum))
  .post(asyncWrapper(Forum.postForum));
router.route("/myForum").get(asyncWrapper(Forum.getMyForum));
router
  .route("/:id")
  .get(asyncWrapper(Forum.detailForum))
  .put(asyncWrapper(Forum.putForum))
  .delete(asyncWrapper(Forum.deleteForum));

module.exports = router;
