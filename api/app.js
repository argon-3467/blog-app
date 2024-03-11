import express from "express";
import logger from "morgan";

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(logger("dev"));

export default app;
