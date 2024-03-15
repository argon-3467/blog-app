import mongoose from "mongoose";
import validator from "validator";
import uniqueValidator from "mongoose-unique-validator";

// Use the README.md of models directory for description.
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: [true, "Post must have an author"],
    },
    thumbnail: {
      type: String,
      default:
        "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
      validate: [validator.isURL, "thumbnail is not a valid URL"],
    },
    category: {
      type: String,
      trim: true,
      maxLength: [30, "Category can't be more than 30 characters in length"],
      default: "Uncategorized",
    },
    keywords: [
      {
        type: String,
        trim: true,
        maxLength: [30, "Keyword can't be more than 30 characters in length"],
      },
    ],
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isSlug, "Slug is not URL safe"],
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    reactions: {
      type: [reactionSchema],
      default: [],
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

// Throws ValidationError in case of a duplicate key(s)
PostSchema.plugin(uniqueValidator, { message: "{PATH} already exists" });

const Post = mongoose.model("Post", PostSchema);

export default Post;
