import mongoose from "mongoose";
import validator from "validator";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";
import CustomError from "../utils/CustomError.js";

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
    passwordUpdatedAt: {
      type: Date,
      default: function () {
        return new Date();
      },
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      validate: [validator.isURL, "profilePicture is not a valid URL"],
    },
    role: {
      type: String,
      enum: {
        values: ["member", "ghost", "admin"],
        // other roles are reserved
        message: "Role can only be 'member'",
      },
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
  this.passwordUpdatedAt = new Date();
  next();
});

// Protect the 'role' field
UserSchema.pre("save", async function (next) {
  if (this.isModified("role")) {
    if (this.role === "admin") {
      throw new CustomError(
        "Use admin route for the 'admin' role",
        403,
        "Forbidden"
      );
    }

    if (this.role === "ghost") {
      throw new CustomError(
        "'ghost' role is reserved for Deleted accounts",
        400,
        "BadRequest"
      );
    }
  }
  next();
});

// Comapare user provided password for login
UserSchema.methods.verifyPassword = async function (pass, passDB) {
  return await bcrypt.compare(pass, passDB);
};

const User = mongoose.model("User", UserSchema);

export default User;
