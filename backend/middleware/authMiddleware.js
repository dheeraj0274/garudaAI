


import User from '../config/models/User.js';
import { verifyToken } from '../utils/authutiils.js';



const authMiddleware= async(req,res,next)=>{
    try {
           
    const token= req.cookies.token;
    console.log('token' , token);
    
  
    

   
    if(!token ) return  res.status(401).json({
        success:false,
        message:'no token provided'
    });


        const decoded = verifyToken(token);



    // const decoded= jwt.verify(token , process.env.JWT_SECRET);
  
    
    const user=await User.findById(decoded._id).select("name email authProvider").lean()
    if(!user) return res.status(404).json({
        sucess:true,
        message:"User not found!",
        
    })

    req.user=user;
    next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'no token or expired',
            error:error.message
        })
    }
  


}
export default authMiddleware;