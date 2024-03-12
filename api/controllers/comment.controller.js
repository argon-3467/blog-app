import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Comment from "../models/comment.model.js";

const getComment = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const updateComment = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const deleteComment = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getCommentsOnPost = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const postCommentOnPost = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getCommentsOnComment = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const postCommentOnComment = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});
const postLikeOnComment = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const postDisLikeOnComment = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

export {
  getComment,
  updateComment,
  deleteComment,
  getCommentsOnPost,
  postCommentOnPost,
  getCommentsOnComment,
  postCommentOnComment,
  postLikeOnComment,
  postDisLikeOnComment,
};
