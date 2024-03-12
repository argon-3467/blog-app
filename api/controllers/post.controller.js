import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Post from "../models/post.model.js";

const getPost = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const postPost = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const updatePost = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const deletePost = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getCategories = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getKeywords = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getPostBySlug = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const postLikeOnPost = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const postDislikeOnPost = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getPosts = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

export {
  getPost,
  postPost,
  updatePost,
  deletePost,
  getCategories,
  getKeywords,
  getPostBySlug,
  postLikeOnPost,
  postDislikeOnPost,
  getPosts,
};
