import express from "express";
import { register, login, getMe } from "../controllers/authController";

const authRouter = express.Router();

import { protect } from "../middleware/auth";

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getMe);

export { authRouter };
