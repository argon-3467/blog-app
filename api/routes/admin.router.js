import express from "express";
import {
  updateUserRole,
  deleteUserComp,
  deletePostComp,
  deleteCommentComp,
} from "../controllers/admin.controller.js";
import { verifyAdmin, verifyMember } from "../controllers/auth.controller.js";

const router = express.Router();

router.delete("/users/:userId", verifyMember, verifyAdmin, deleteUserComp);
router.delete("/posts/:postId", verifyMember, verifyAdmin, deletePostComp);
router.delete(
  "/comments/:commentId",
  verifyMember,
  verifyAdmin,
  deleteCommentComp
);

router.post("/users/:userId/role", verifyMember, verifyAdmin, updateUserRole);

export default router;
