import express from "express";
import logger from "morgan";
import CustomError from "./utils/CustomError.js";
import errorHandler from "./controllers/error.controller.js";

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(logger("dev"));

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
