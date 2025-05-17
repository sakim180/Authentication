import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import usermodel from '../models/usermodel.js';
import transporter from '../config/nodemailer.js';

export const register=async(req,res)=>{
   
    const {name,email,password}=req.body;
    
   
    
    if(!name || !email || !password){
        return res.json({success: false,message:'missing details'})
    }
    try{
        const existinguser=await usermodel.findOne({email})
        if(existinguser){
            return res.json({success: false,message:'user Allready exits'})

        }

         const haseedPassword=await bcrypt.hash(password,10)
         
         const user= new usermodel({name,email,password:haseedPassword})

         await user.save();
         const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
         res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            samesite:process.env.NODE_ENV ==='production '?'none' :'strict',
            maxAge:7*24*60*60*1000
         })
  //sending welcome Email
   await transporter.sendMail({
    from: process.env.SENDER_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Wellcome to join sakim Institude", // Subject line
    text: `Wellcome to sakim institude.Your account has been created this mail:${email}`, // plain text body
   
  });


 return res.json({success: true,message:'User creted successfully'})


       
    }
    catch(err){
        res.json({success: false,message:err.message})

    }

}


export const login=async(req,res)=>{
const {email,password}=req.body

if(!email || !password){
    return res.json({success:false,message:"Enter Your valid email and password"})
}
try{
    const user=await usermodel.findOne({email});
    if(!user){
        return res.json({success:false,message:"Invalid Email"})

    }
    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.json({success:false,message:"Invalid Password"})
    }

const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
res.cookie('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
    maxAge: 7*24*60*60*1000
})
return res.json({success:true})




}
catch(err){
    res.json({success:false,message:err.message})

}

}


export const logout=async(req,res)=>{
    
    try {
        res.clearCookie('token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
    
        return res.status(200).json({
          success: true,
          message: 'Logged out successfully',
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: err.message || 'Server error during logout',
        });
      }

}


export const sendVerifyOtp=async(req,res)=>{
   
    try{
        const {userId}=req.body
        const user= await usermodel.findById(userId)
        const email=user.email;

        if(user.isAccountVerify){
            return res.json({success:false,message:"Accaoun already verified"})

        }
        const otp=String(Math.floor(100000+ Math.random()*900000));

        user.verifyOtp=otp;
        user.verifyOtpExpireAt=Date.now()+24*60*60*1000;
        await user.save();

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL, // sender address
            to: email, // list of receivers
            subject: "Verification OTP", // Subject line
            text: `Your Verificaton OTP:${otp}`, // plain text body
           
          });
          res.json({success:true,message:"Verification OTP Send On your Email"})


    }
    catch(err){


    }

}

export const verifyEmail=async(req,res)=>{
    const {userId,otp}=req.body
    
   
    if(!userId || !otp){
       return res.json({success:false,message:'Missing Details'})

    }
    try{
        const user=await usermodel.findById(userId)
       
        const name=user.name;
        const email=user.email;
        if(!user){
          return  res.json({success:false,message:'user not found'})

        }
        if(user.verifyOtp === '' || user.verifyOtp !== otp){
          return  res.json({success:false,message:'Invalid Otp'})

        }
        if(user.verifyOtpExpireAt <Date.now()){
          return  res.json({success:false,message:' Otp expired'})
        }
        user.isAccountVerify=true;
        user.verifyOtp='';
        user.verifyOtpExpireAt=0;
        await user.save();

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL, // sender address
            to: email, // list of receivers
            subject: "Congratulation", // Subject line
            text: `Congratulation ${name} .your email is successfully verified`, // plain text body
           
          });

        return  res.json({success:true,message:'Email Verified Successfully'})



    }
    catch(err){
        res.json({success:false,message:err})

        
    }
    
   

 }

 export const sendPassResetOtp=async(req,res)=>{
    
    const {email}=req.body
  
   
    if(!email){
      return  res.json({success:false,message:"Email needed"})
    }
    try{
          
   
        const user= await usermodel.findOne({email});
        if(!user){
           
         return   res.json({success:false,message:'User not found'});
        }
        const otp=String(Math.floor(100000+ Math.random()*900000));
       
        user.verifyOtp=otp;
        user.verifyOtpExpireAt=Date.now()+15*60*1000;
        await user.save();
     




        await transporter.sendMail({
            from: process.env.SENDER_EMAIL, // sender address
            to: email, // list of receivers
            subject: "Password Reset verification mail", // Subject line
            text: `Your Verificaton OTP:${otp}`,

        })

       



      return  res.json({success:true})

    }catch(err){
       return res.json({success:false,message:err})

    }

 }


 export const forgotOtpMatch=async(req,res)=>{
    
    const {otp,email,newPassword}=req.body
    
    
    if(!otp || !email|| !newPassword){
        return  res.json({success:false,message:"Something Went Wrong!"})

    }
    try{
        const user=await usermodel.findOne({email});
        
      
        if(!user){
           
            return  res.json({success:false,message:"Something Went Wrong! Try Again"});

        }
        if(user.verifyOtpExpireAt <Date.now()){
            return res.json({success:false,message:"Otp expired!"})


        }
        if(user.verifyOtp === '' || user.verifyOtp !== otp){
           

            return  res.json({success:false,message:"Invalid Otp!"});


        }
        
        
        const haseedPassword=await bcrypt.hash(newPassword,10);
        
        user.password=haseedPassword;
        user.verifyOtp='';
        user.verifyOtpExpireAt=0;
        await user.save()
       

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL, // sender address
            to: email, // list of receivers
            subject: "Password Reset Successfull", // Subject line
            text: `Login through your new password`,

        })



        return  res.json({success:true});
        

       

    }
    catch(err){
        return  res.json({success:false,message:err});

    }




 }
 export const isAuthenticated=(req,res)=>{
    try{
        
        res.json({success:true,message:"User is Authenticated"})
    }
    catch(err){
        res.json({success:false,message:err})



    }

 }