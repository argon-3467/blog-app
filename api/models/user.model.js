import mongoose from "mongoose";
import validator from "validator";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";

// Use the README.md of models directory for description.
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minLength: [3, "Username can't be less than 3 characters in length"],
      maxLength: [30, "Username can't be more than 30 characters in length"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Email is invalid"],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      validate: [validator.isURL, "profilePicture is not a valid URL"],
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    role: {
      type: String,
      enum: ["member", "visiter", "admin"],
      default: "member",
    },
  },
  { timestamps: true }
);

// Throws ValidationError in case of a duplicate key(s)
UserSchema.plugin(uniqueValidator, { message: "{PATH} already exists" });

// Hash the password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Comapare user provided password for login
UserSchema.methods.verifyPassword = async function (pass, passDB) {
  return await bcrypt.compare(pass, passDB);
};

const User = mongoose.model("User", UserSchema);

export default User;
