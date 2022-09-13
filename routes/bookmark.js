const express = require("express");
const router = express.Router();
const Bookmark = require("../controllers/bookmark");

const asyncWrapper = require("../middleware/async");

router.route("/").get(asyncWrapper(Bookmark.getMyBookmark));
router
  .route("/:id")
  .post(asyncWrapper(Bookmark.postMyBookmark))
  .delete(asyncWrapper(Bookmark.deleteMyBookmark));
module.exports = router;
