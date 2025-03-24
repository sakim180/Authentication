import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,uniqe:true},
    password:{type:String,require:true},
    verifyOtp:{type:String,default:''},
    verifyOtpExpireAt:{type:Number,default:0},
    isAccountVerify:{type:Boolean,default:false},
    resetOtp:{type:String,default:''},
    resetOtpExpireAt:{type:Number,default:0}



})
const usermodel=mongoose.models.user || mongoose.model('user',userSchema);
export default usermodel;