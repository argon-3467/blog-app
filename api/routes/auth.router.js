import express from "express";
import * as authController from "./../controllers/auth.controller.js";

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/signin").post(authController.signin);

export default router;
