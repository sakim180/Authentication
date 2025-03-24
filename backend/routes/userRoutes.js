import express from "express";
import userAuth from "../middleware/userauth.js";
import { getUserData } from "../controller/userController.js";
const userRouter=express.Router()

userRouter.get('/get-user-data',userAuth, getUserData)
export default userRouter