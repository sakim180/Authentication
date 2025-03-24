import usermodel from "../models/usermodel.js"
export const getUserData=async(req,res)=>{
    console.log("called")
    const {userId}=req.body;
    if(!userId){
        res.json({success:false,message:"Something went wrong"})

    }
    try{
        const user= await usermodel.findById(userId)
        if(!user){
            res.json({success:false,message:"User not found!"})
    
        }
        res.json({
            success:true,
            userData:{
                name:user.name,
                isAccountVerify:user.isAccountVerify
            }
        })


    }
    catch(err){
        
    }

}