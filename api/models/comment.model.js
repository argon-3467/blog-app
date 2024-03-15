import mongoose from "mongoose";
import User from "./user.model.js";
import reactionSchema from "./reaction.schema.js";

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
    reactions: {
      type: [reactionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
