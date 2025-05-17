import express from "express";
import userAuth from "../middleware/userauth.js";
import { getUserData } from "../controller/userController.js";
const userrouter=express.Router()

userrouter.get('/get-user-data',userAuth, getUserData)
export default userrouter