import User from "./../models/user.model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";

const signup = asyncErrorHandler(async function (req, res, next) {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  // Don't send the password and __v back
  newUser.password = undefined;
  newUser.__v = undefined;
  res.status(201).json({
    status: "success",
    message: "New user created successfully",
    data: {
      token,
      user: newUser,
    },
  });
});

const signin = asyncErrorHandler(async function (req, res, next) {
  // login can be username or email.
  const login = req.body.login;
  const password = req.body.password;

  if (!login || !password) {
    const err = new CustomError("Login credentials are missing", 400);
    return next(err);
  }

  // check if user exists
  const user = await User.findOne({
    $or: [{ email: login }, { username: login }],
  }).select("+password");
  if (!user || !(await user.verifyPassword(password, user.password))) {
    const err = new CustomError("Incorrect username or password", 400);
    return next(err);
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    data: {
      token,
    },
  });
});

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
}

const verifyMember = asyncErrorHandler(async function (req, res, next) {
  // Todo
  next();
});

const verifySelf = asyncErrorHandler(async function (req, res, next) {
  // Todo
  next();
});

const verifyAdmin = asyncErrorHandler(async function (req, res, next) {
  // Todo
  next();
});

export { signup, signin, verifyMember, verifySelf, verifyAdmin };
