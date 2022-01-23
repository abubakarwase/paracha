const ErrorResponse = require("../utils/errorResponse");
const Post = require("../models/Post");
const asyncHandler = require("../middlewares/async");
// @desc    Get all post
// @route   GET /api/v1/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single post
// @route   GET /api/v1/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post)
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Create new post
// @route   POST /api/v1/posts
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    data: post,
  });
});

// @desc    Update post
// @route   PUT /api/v1/posts/:id
// @access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post)
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );

  // Make sure user is post owner
  if (post.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this post`,
        401
      )
    );
  }

  post = await Post.findOneAndUpdate(req.params.id, req.body, {
    new: true, // to return a new document
    runValidators: true, // to run mongoose model validators
  });

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Delete post
// @route   DELETE /api/v1/posts/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post)
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );

  // Make sure user is post owner
  if (post.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this post`,
        401
      )
    );
  }
  // this will trigger mongoose middleware to remove courses
  post.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
