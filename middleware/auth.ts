import jwt from "jsonwebtoken";
import { asyncHandler } from "./async";
import { ErrorResponse } from "../utils/errorResponse";
import { User } from "../models/User";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } /* else if(req.cookies.token) {
    token = req.cookies.token;
  } */

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not Authorized to access this route", 404));
  }

  try {
    // Verify Token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Not Authorized to access this route", 404));
  }
});

// Grant access to specific roles
export const authorize = (...roles: any[]) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
