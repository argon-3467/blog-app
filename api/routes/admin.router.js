import express from "express";
import { deleteUser } from "../controllers/user.controller.js";
import { deletePost } from "../controllers/post.controller.js";
import { deleteComment } from "../controllers/comment.controller.js";
import { updateUserRole } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.delete("/users/:userId", verifyAdmin, deleteUser);
router.delete("/posts/:postId", verifyAdmin, deletePost);
router.delete("/comments/:commentId", verifyAdmin, deleteComment);

router.post("/users/:userId/role", verifyAdmin, updateUserRole);

export default router;
