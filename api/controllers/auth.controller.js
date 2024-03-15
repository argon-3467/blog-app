import User from "./../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";
import util from "util";

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
  }).select("+password role");
  if (user && user.role == "ghost") {
    const err = new CustomError(
      "Ghosts can't login. Contact an admin to be alive again",
      400
    );
    return next(err);
  }

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

// verifies the token and role to be 'member'
const verifyMember = asyncErrorHandler(async function (req, res, next) {
  // Read the token from req
  let decodedToken = await getDecodedTokenFromReq(req);

  // Check if user exists
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return next(new CustomError("You don't Exist", 404));
  }

  if (user.role == "ghost") {
    return next(
      new CustomError(
        "You are a ghost. Contact an admin to be alive again or for 'Moksh prapti'",
        401
      )
    );
  }

  // if User updated something after the token was issued
  checkTokenIsNotOld(user, decodedToken);

  // allow user
  req.user = user;
  next();
});

// verifies the token and ensures userId or postId or commentId present in the belongs to the same user.
const verifySelf = asyncErrorHandler(async function (req, res, next) {
  const user = req.user;
  const userId = req.params.userId;
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  // check userId if action is on userId
  if (userId && userId != user.id) {
    return next(new CustomError("You Can't modify another user", 403));
  }

  // check postId if action is on postId
  if (postId) {
    const post = await Post.findById(postId);
    if (!post) {
      return next(new CustomError(`Can not find post with id: ${postId}`, 404));
    }
    if (post.author != user.id)
      return next(new CustomError("You Can't modify another user's Post", 403));
    req.post = post;
  }

  // check commentId if action is on commentId
  if (commentId) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(
        new CustomError(`Can not find comment with id: ${commentId}`, 404)
      );
    }
    if (comment.author != user.id)
      return next(
        new CustomError("You Can't modify another user's Comment", 403)
      );
    req.comment = comment;
  }

  // allow user
  next();
});

// verifies that req.user is 'admin'
const verifyAdmin = asyncErrorHandler(async function (req, res, next) {
  if (req.user.role != "admin") {
    return next(new CustomError("You are not an admin", 403));
  }

  // allow user
  next();
});

// Returns decodedToken and throws if any errors occur
async function getDecodedTokenFromReq(req) {
  let testToken = req.headers.authorization;
  if (testToken && testToken.startsWith("Bearer")) {
    testToken = testToken.split(" ")[1];
  }

  if (!testToken) {
    throw new CustomError("You are not logged in", 401);
  }

  return await util.promisify(jwt.verify)(testToken, process.env.JWT_SECRET);
}

// Throws if user has been updated after the token was issued
function checkTokenIsNotOld(user, decodedToken) {
  if (new Date(user.passwordUpdatedAt).getTime() / 1000 > decodedToken.iat) {
    throw new CustomError("User updated password. Please login again", 403);
  }
}

export { signup, signin, verifyMember, verifySelf, verifyAdmin };
