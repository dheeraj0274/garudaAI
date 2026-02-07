import User from "../config/models/User.js";
import bcrypt from "bcryptjs";
import otp from "../config/models/otp.js";
import { signToken } from "../utils/authutiils.js";
import sendEmail from "../utils/sendEmail.js";

export const sendOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    await otp.deleteMany({ email });

    const userOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("otp", userOTP);

    await otp.create({
      email,
      otp: userOTP,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const user = new User({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });

    // const savedUser = await user.save();

    // const token = signToken(savedUser._id);

    // res.cookie('token',token , {
    //   httpOnly:true,
    //   sameSite:'strict',
    //   secure:process.env.NODE_ENV === 'production',
    //   maxAge:24*60*60*1000
    // })

    res.status(200).json({
      success: true,

      message: "OTP  sent",
    });

    sendEmail({
      to: email,
      subject: "Your Otp for verification",
      html: `<h2>Your otp is ${userOTP}</h2><br><p>Valid for 5 minutes</p>`,
    }).catch(console.errror);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error in register",
    });
  }
};

export const verifyOtpAndRegister = async (req, res) => {
  const { email, name, password, userOTP } = req.body;
  try {

    const otpRecord = await otp.findOne({email});
    const isUser = await User.findOne({email});

    if(isUser) return res.status(400).json({
      success:false,
      message:'Already registered'
    })

    if(!otpRecord) return res.status(400).json({
      success:false,
      message:'Otp not found or expired'
    })


    if(otpRecord.otp != userOTP) return res.status(401).json({
      success:true,
      message:'Invalid OTP'
    })

    if(otpRecord.expiresAt<Date.now()) return res.status(400).json({
      success:false,
      message:'OTP Expired'
    })
   
    const hashedPassword = await bcrypt.hash(password,10);

    const user =  new User({
      name,
      email,
      password:hashedPassword
    })

    const savedUser = await user.save();
    const token = signToken(savedUser._id)

    res.cookie('token' , token, {
      httpOnly:true,
      sameSite:'strict',
      secure:process.env.NODE_ENV==='production',
      maxAge:24*60*60*1000

    })

    res.status(201).json({
      success:true,
      savedUser,
      message:'user registered successfully'
    })
    

  } catch (error) {


    res.status(500).json({
      succes:false,
      error:error.message
    })
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(201).json({
      success: false,
      message: "Register first!",
    });

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched)
    return res.status(401).json({
      success: false,
      message: "Incorrect Password",
    });

  const token = signToken(user.id);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,

    message: "Login successfully",
  });
};

export const profile = (req, res) => {
  res.status(200).json({
    success: true,
    mesage: "protected route",
    User: req.user,
  });
};

export const logOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Logged-Out",
  });
};
