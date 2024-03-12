import express from "express";
import {
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
} from "../controllers/post.controller.js";
import {
  getCommentsOnPost,
  postCommentOnPost,
} from "../controllers/comment.controller.js";
import { verifySelf, verifyMember } from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/:postId")
  .get(getPost)
  .put(verifySelf, updatePost)
  .delete(verifySelf, deletePost);

router.get("/categories", getCategories);
router.get("/keywords", getKeywords);
router.get("/slug/:slug", getPostBySlug);

router
  .route("/:postId/comments")
  .get(getCommentsOnPost)
  .post(verifyMember, postCommentOnPost);
router.post("/:postId/likes", verifyMember, postLikeOnPost);
router.post("/:postId/dislikes", verifyMember, postDislikeOnPost);

router.route("/").get(getPosts).post(verifyMember, postPost);

export default router;
