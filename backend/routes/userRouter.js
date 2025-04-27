import express from "express";
import { loginUser, registerUser, adminLogin, getUserInfo } from "../cantroller/userCantrollers.js";
import authUser from "../middlewere/auth.js";

const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/profile', authUser, getUserInfo);

export default userRouter;
