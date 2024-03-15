import express from "express";
import logger from "morgan";
import authRoutes from "./routes/auth.router.js";
import userRoutes from "./routes/user.router.js";
import postRoutes from "./routes/post.router.js";
import commentRoutes from "./routes/comment.router.js";
import adminRoutes from "./routes/admin.router.js";
import CustomError from "./utils/CustomError.js";
import errorHandler from "./controllers/error.controller.js";

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(logger("dev"));

app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/posts/", postRoutes);
app.use("/api/v1/comments/", commentRoutes);
app.use("/api/v1/admin/", adminRoutes);

app.use("/api/*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404,
    "NotFoundError"
  );
  next(err);
});

app.use(errorHandler);

export default app;
