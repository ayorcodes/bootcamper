import { Course } from "../models/Course";
import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";
import { Bootcamp } from "../models/Bootcamp";

//@desc get all courses
//@route GET /api/v1/courses
//@route GET /api/v1/bootcamps/:bootcampId/courses
//@access Public

export const getCourses = asyncHandler(async (req, res, next) => {
  let query: any;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

//@desc get single courses
//@route GET /api/v1/courses/:id
//@access Public

export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with Id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});


//@desc add course
//@route POST /api/v1/bootcamps/:bootcampId/courses
//@access Private

export const addCourse = asyncHandler(async (req, res, next) => {

  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with Id of ${req.params.bootcampId}`, 404)
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

//@desc update course
//@route PUT /api/v1/courses/:id
//@access Private

export const updateCourse = asyncHandler(async (req, res, next) => {

  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No bootcamp with Id of ${req.params.bootcampId}`, 404)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: course,
  });
});



//@desc delete course
//@route DELETE /api/v1/courses/:id
//@access Private

export const deleteCourse = asyncHandler(async (req, res, next) => {

  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No bootcamp with Id of ${req.params.bootcampId}`, 404)
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: course,
  });
});
