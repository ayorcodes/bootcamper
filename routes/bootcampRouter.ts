import express from "express";
import {
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamp,
} from "../controllers/bootcampController";

//include other resource routers
import { courseRouter } from "./courseRouter";


const bootcampRouter = express.Router();

import { protect, authorize } from "../middleware/auth";

// Re-route into other resource routers

bootcampRouter.use('/:bootcampId/courses', courseRouter);

bootcampRouter.route("/").get(getBootcamps).post(protect, authorize('publisher', 'admin'), createBootcamp);

bootcampRouter
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

export { bootcampRouter };
