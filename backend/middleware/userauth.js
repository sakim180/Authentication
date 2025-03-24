import jwt from "jsonwebtoken"
const userAuth=(req,res,next)=>{
    
    const {token}=req.cookies;
    if(!token){
        return  res.json({success:false,message:' Not Authorized ,Login Again'})
    }
    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        if(decodedToken){
            req.body.userId=decodedToken.id

        }else{
            return  res.json({success:false,message:' Not Authorized ,Login Again'})
        }
        next();
    }
    catch(err){
        return  res.json({success:false,message:err})
        
    }

}
export default userAuth