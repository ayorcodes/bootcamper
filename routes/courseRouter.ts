import express from "express";
import { protect, authorize } from "../middleware/auth";
import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
const courseRouter = express.Router({ mergeParams: true });

courseRouter
  .route("/")
  .get(getCourses)
  .post(protect, authorize("publisher", "admin"), addCourse);
courseRouter
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

export { courseRouter };
