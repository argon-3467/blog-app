import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: [true, "Comment must have an author"],
      ref: "User",
    },
    commentEntityModel: {
      type: String,
      enum: ["Comment", "Post"],
      required: [true, "Entity model is required"],
    },
    entityId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Entity is required"],
      refPath: "commentEntityModel",
    },
    replies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
