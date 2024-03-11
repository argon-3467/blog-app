import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

import app from "./app.js";

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/blog-app-dev")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Server has started...");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured! Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
