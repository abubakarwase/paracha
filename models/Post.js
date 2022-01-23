const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: [100, "title can not be more than 100 character"],
  },

  content: {
    type: String,
    required: [true, "Please add a content"],
    maxlength: [100, "content can not be more than 100 character"],
  },
});

module.exports = mongoose.model("Post", PostSchema);
