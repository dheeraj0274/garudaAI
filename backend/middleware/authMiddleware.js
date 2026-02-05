

import jwt from 'jsonwebtoken';
import User from '../config/models/User.js';
import { verifyToken } from '../utils/authutiils.js';



const authMiddleware= async(req,res,next)=>{
    try {
           
    const token= req.cookies.token;
    

   
    if(!token ) return res.status(401).json({
        success:false,
        message:'no token provided'
    })


    // const decoded= jwt.verify(token , process.env.JWT_SECRET);
    const decoded = verifyToken(token);
    const user=await User.findById(decoded.id).select("name email").lean()
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
            error:error
        })
    }
  


}
export default authMiddleware;