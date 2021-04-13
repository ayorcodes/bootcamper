import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";
import { User } from "../models/User";

//@desc Register user
//@route POST /api/v1/auth/register
//@access Public

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body

  //Create user
  const user: any = await User.create({
    name,
    email,
    password,
    role
  });

  sendTokenResponse(user, 200, res);
});


//@desc login user
//@route POST /api/v1/auth/login
//@access Public

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // Validate email & password
  if(!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  // Check for user
  const user: any = await User.findOne({ email }).select('+password');

  if(!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if(!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token
  sendTokenResponse(user, 200, res);
});


// Get token from model, create cookie and send cookie
const sendTokenResponse = (user, statusCode, res) => {
   // Create token
  const token = user.getSignedJwtToken();

  const cookieExpires: any = process.env.JWT_COOKIE_EXPIRE;
  const options: any = {
    expires: new Date(Date.now() + cookieExpires * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if(process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token: token
    })
}


//@desc get current logged in user
//@route POST /api/v1/auth/me
//@access Private

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  })
})




