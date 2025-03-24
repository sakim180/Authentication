import { Router } from "express";
import { isAuthenticated, login, logout, matchOtp, register, sendPassResetOtp, sendVerifyOtp, verifyEmail } from "../controller/authController.js";
import userAuth from "../middleware/userauth.js";

const userAuthRouter=Router()

userAuthRouter.post('/register',register)
userAuthRouter.post('/login',login)
userAuthRouter.delete('/logout',logout)
userAuthRouter.post('/sendotp',userAuth,sendVerifyOtp)
userAuthRouter.post('/verifyemail',userAuth,verifyEmail)
userAuthRouter.post('/pass-reset-otp',sendPassResetOtp)
userAuthRouter.post('/new-pass-set',matchOtp)
userAuthRouter.get('/is-auth',userAuth, isAuthenticated)




export default userAuthRouter