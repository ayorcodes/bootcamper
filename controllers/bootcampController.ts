import { Bootcamp } from "../models/Bootcamp";
import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";
//@desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
export const getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await (Bootcamp.find().populate('courses'));
    
    res.status(200).json({
      success: true,
      msg: "show all bootcamps",
      data: bootcamps,
      count: bootcamps.length
    });
  
})

//@desc get bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
export const getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      msg: `show bootcamp ${req.params.id}`,
      data: bootcamp
    });
})

//@desc create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
export const createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      msg: "create new bootcamp",
      data: bootcamp,
    })
})

//@desc Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
export const updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if(!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
  
    res.status(200).json({
      success: true,
      msg: `update bootcamp ${req.params.id}`,
      data: bootcamp
    });
})

//@desc delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
export const deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
  
    if(!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    bootcamp.remove();
  
    res.status(200).json({
      success: true,
      msg: `update bootcamp ${req.params.id}`,
      data: {}
    });
})



