import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reaction: {
    type: String,
    required: true,
    enum: {
      values: ["like", "dislike", "love", "haha", "wow", "sad", "angry"],
      message:
        "Possible reaction values: 'like', 'dislike', 'love', 'haha', 'wow', 'sad', 'angry'",
    },
  },
});

export default reactionSchema;
