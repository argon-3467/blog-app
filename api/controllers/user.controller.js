import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import User from "../models/user.model.js";

const getMe = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const updateMe = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const deleteMe = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getUser = asyncErrorHandler(async function (req, res, next) {
  const userId = req.params.userId;
  const user = await User.findById(userId).select("-__v");

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: `Can not find user with id: ${userId}`,
      data: {},
    });
  }

  res.status(200).json({
    status: "success",
    message: "User retrieved successfully",
    data: { user },
  });
});

const deleteUser = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getUserPosts = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getUserComments = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getUsers = asyncErrorHandler(async function (req, res, next) {
  const users = await User.find().select("-__v");
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
  deleteUser,
  getUserPosts,
  getUserComments,
  getUsers,
};
