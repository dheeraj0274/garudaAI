
import User from "../config/models/User.js";
import bcrypt from "bcryptjs";

import { signToken } from "../utils/authutiils.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const token = signToken(savedUser._id);

    res.cookie('token',token , {
      httpOnly:true,
      sameSite:'strict',
      secure:process.env.NODE_ENV==='production',
      maxAge:24*60*60*1000
    })

    res.status(201).json({
      success: true,
      
      user: savedUser,
      message: "User registered!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error in register",
    });
  }
};


export const login= async(req,res)=>{
    const {email , password}=req.body;


     const user= await User.findOne({email});
    
     
     if(!user) return res.status(201).json({
        success:false,
        message:'Register first!'
     })

     const isMatched = await bcrypt.compare(password , user.password);

     if(!isMatched) return res.status(401).json({
        success:false,
        message:'Incorrect Password'
     });


    
    const token = signToken(user.id);
     res.cookie('token',token , {
      httpOnly:true,
      sameSite:'strict',
      secure:process.env.NODE_ENV==='production',
      maxAge:24*60*60*1000
    })
     res.status(200).json({
        success:true,
        
        message:"Login successfully"
     })

}


export const profile=(req,res)=>{
    res.status(200).json({
        success:true,
        mesage:'protected route',
        User:req.user
    })
}


export const logOut=(req,res)=>{

  res.clearCookie('token',{
    httpOnly:true,
    sameSite:'strict',
    secure:process.env.NODE_ENV==='production'
  })

  res.status(200).json({
    success:true,
    message:'Logged-Out'
  })

}
