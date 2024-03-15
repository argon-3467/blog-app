import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import CustomError from "../utils/CustomError.js";
import ApiFeatures from "../utils/ApiFeatures.js";

const getMe = asyncErrorHandler(async function (req, res, next) {
  const user = req.user;
  return res.status(200).json({
    status: "success",
    message: "Data retrieved successfully",
    data: { user },
  });
});

const updateMe = asyncErrorHandler(async function (req, res, next) {
  const user = req.user;
  const { username, email, password, profilePicture } = req.body;
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;
  if (profilePicture) user.profilePicture = profilePicture;
  await user.save();
  return res.status(200).json({
    status: "success",
    message: "Data updated successfully",
    data: { user },
  });
});

const deleteMe = asyncErrorHandler(async function (req, res, next) {
  // can't save user with 'ghost' role so do findByIdandUpdate
  let user = req.user;
  await User.findByIdAndUpdate(user.id, { role: "ghost" }, { new: true });
  return res.status(200).json({
    satus: "success",
    message: "You are a ghost now. Contact an admin to delete you permanently",
    data: {},
  });
});

const getUser = asyncErrorHandler(async function (req, res, next) {
  const userId = req.params.userId;
  const user = await User.findById(userId).select("-__v -passwordUpdatedAt");

  if (!user) {
    return next(new CustomError(`Can not find user with id: ${userId}`, 404));
  }

  if (user.role == "ghost") {
    return next(
      new CustomError(`User with id: ${userId} has been deleted`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "User retrieved successfully",
    data: { user },
  });
});

const getUserPosts = asyncErrorHandler(async function (req, res, next) {
  const userId = req.params.userId;
  const features = new ApiFeatures(
    Post.find({ author: userId, isPrivate: false }),
    req.query
  )
    .limitFields()
    .paginate();

  const posts = await features.query;

  if (!posts) {
    return next(
      new CustomError(`Can not find posts of user with id: ${userId}`, 404)
    );
  }

  if (posts.length == 0 && +req.query.page > 1) {
    return res.status(404).json({
      status: "fail",
      message: "No more posts",
      data: {},
    });
  }

  res.status(200).json({
    status: "success",
    message:
      posts.length > 0
        ? `Successfully retrieved ${posts.length} posts of user with id: ${userId}`
        : "User does not have any public posts",
    data: { _id: userId, length: posts.length, posts },
  });
});

const getUserComments = asyncErrorHandler(async function (req, res, next) {
  const userId = req.params.userId;
  const features = new ApiFeatures(Comment.find({ author: userId }), req.query)
    .limitFields()
    .paginate();

  const comments = await features.query;

  if (!comments) {
    return next(
      new CustomError(`Can not find Comments of user with id: ${userId}`, 404)
    );
  }

  if (comments.length == 0 && +req.query.page > 1) {
    return res.status(404).json({
      status: "fail",
      message: "No more comments",
      data: {},
    });
  }

  res.status(200).json({
    status: "success",
    message:
      comments.length > 0
        ? `Successfully retrieved ${comments.length} posts of user with id: ${userId}`
        : "User does not have any comments",
    data: { _id: userId, length: comments.length, comments },
  });
});

const getUsers = asyncErrorHandler(async function (req, res, next) {
  const features = new ApiFeatures(User.find(), req.query)
    .limitFields()
    .paginate();

  const users = await features.query;
  if (!users) {
    return next(new CustomError("Can not get users", 500));
  }

  if (users.length == 0 && +req.query.page > 1) {
    return res.status(404).json({
      status: "fail",
      message: "No more Users",
      data: {},
    });
  }

  res.status(200).json({
    status: "success",
    message: `Successfully retrieved ${users.length} users`,
    data: { length: users.length, users },
  });
});

export {
  getMe,
  updateMe,
  deleteMe,
  getUser,
  getUserPosts,
  getUserComments,
  getUsers,
};
