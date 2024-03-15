import express from "express";
import {
  getPosts,
  getMyPosts,
  getPost,
  postPost,
  updatePost,
  deletePost,
  getCategories,
  getKeywords,
  getPostBySlug,
  postReactionOnPost,
} from "../controllers/post.controller.js";
import {
  getCommentsOnPost,
  postCommentOnPost,
} from "../controllers/comment.controller.js";
import { verifySelf, verifyMember } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/").get(getPosts).post(verifyMember, postPost);
router.get("/me", verifyMember, getMyPosts);
router.get("/categories", getCategories);
router.get("/keywords", getKeywords);

router
  .route("/:postId")
  .get(getPost)
  .put(verifyMember, verifySelf, updatePost)
  .delete(verifyMember, verifySelf, deletePost);
router.get("/slug/:slug", getPostBySlug);

router
  .route("/:postId/comments")
  .get(getCommentsOnPost)
  .post(verifyMember, postCommentOnPost);
router.post("/:postId/reaction", verifyMember, postReactionOnPost);

export default router;
