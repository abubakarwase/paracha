const express = require("express");

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const Post = require("../models/Post");
const advancedResults = require("../middlewares/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Post, "courses"), getPosts)
  .post(createPost);

router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
