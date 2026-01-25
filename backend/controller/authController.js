
import User from "../config/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      token,
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


     const isUser= User.findOne({email});
     if(!isUser) return res.status(201).json({
        success:false,
        message:'Register first!'
     })

     const isMatched = bcrypt.compare(password , user.password);

     if(!isMatched) return res.status(401).json({
        success:false,
        message:'Incorrect Password'
     });


     const token = jwt.sign(
        {id:user.id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}

     )
     res.status(200).json({
        success:true,
        token,
        message:"User registef succesfully"
     })

}
