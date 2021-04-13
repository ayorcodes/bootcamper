import express from "express";
import dotenv from "dotenv";
import { logger } from "./middleware/logger";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/error";
import cookieParser from "cookie-parser";

//load env vars
dotenv.config({
  path: "./config/config.env",
});

connectDB();

//Route files
import { bootcampRouter } from "./routes/bootcampRouter";
import { courseRouter } from "./routes/courseRouter";
import { authRouter } from "./routes/authRouter";

const app = express();

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

//dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcampRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`);
  server.close(() => process.exit(1));
});
