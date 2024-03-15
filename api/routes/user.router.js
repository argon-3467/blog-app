import express from "express";
import {
  getMe,
  updateMe,
  deleteMe,
  getUser,
  getUsers,
  getUserPosts,
  getUserComments,
} from "../controllers/user.controller.js";
import { verifyMember } from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/me")
  .get(verifyMember, getMe)
  .put(verifyMember, updateMe)
  .delete(verifyMember, deleteMe);

router.get("/:userId", getUser);
router.get("/:userId/posts", verifyMember, getUserPosts);
router.get("/:userId/comments", verifyMember, getUserComments);

router.get("/", getUsers);

export default router;
