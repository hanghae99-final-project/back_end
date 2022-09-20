const express = require("express");
const router = express.Router();
const Profile = require("../controllers/profile");

const asyncWrapper = require("../middleware/async");

router
  .route("/")
  .get(asyncWrapper(Profile.getProfile))
  .put(asyncWrapper(Profile.putProfile));

router.route("/spec").post(asyncWrapper(Profile.postSpec));
router
  .route("/spec/:id")
  .put(asyncWrapper(Profile.putSpec))
  .delete(asyncWrapper(Profile.deleteSpec));

router
  .route("/dday")
  .get(asyncWrapper(Profile.getDday))
  .post(asyncWrapper(Profile.postDday));
router
  .route("/dday/:id")
  .put(asyncWrapper(Profile.putDday))
  .delete(asyncWrapper(Profile.deleteDday));
router.route("/nick/:nickname").get(asyncWrapper(Profile.getNickCheck));

module.exports = router;
