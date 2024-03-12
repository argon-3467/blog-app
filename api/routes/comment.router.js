import express from "express";
import {
  getComment,
  updateComment,
  deleteComment,
  getCommentsOnComment,
  postCommentOnComment,
  postLikeOnComment,
  postDisLikeOnComment,
} from "../controllers/comment.controller.js";
import { verifyMember, verifySelf } from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/:commentId")
  .get(getComment)
  .put(verifySelf, updateComment)
  .delete(verifySelf, deleteComment);

router
  .route("/:commentId/replies")
  .get(getCommentsOnComment)
  .post(verifyMember, postCommentOnComment);
router.post("/:commentId/likes", verifyMember, postLikeOnComment);
router.post("/:commentId/dislikes", verifyMember, postDisLikeOnComment);
export default router;
