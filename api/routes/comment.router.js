import express from "express";
import {
  getComment,
  updateComment,
  deleteComment,
  getCommentsOnComment,
  postCommentOnComment,
  postReactionOnComment,
} from "../controllers/comment.controller.js";
import { verifyMember, verifySelf } from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/:commentId")
  .get(getComment)
  .put(verifyMember, verifySelf, updateComment)
  .delete(verifyMember, verifySelf, deleteComment);

router
  .route("/:commentId/replies")
  .get(getCommentsOnComment)
  .post(verifyMember, postCommentOnComment);
router.post("/:commentId/reaction", verifyMember, postReactionOnComment);
export default router;
