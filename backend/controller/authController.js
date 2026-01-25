// import User from "../config/models/User.js";
// import bcrypt from "bcryptjs";

// import jwt from "jsonwebtoken";

// export const registerUser = async (req,res) => {
//   try {
//     const { name, email, password } = req.body;
//     console.log("body", name, email, password);
//     const isUser = await User.findOne({email});
//     if (isUser)
//       return res.status(201).json({
//         success: false,
//         message: "User already exist",
//       });
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password:hashedPassword,
//     });
//     const savedUser = await user.save();
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECTRET, {
//       expiresIn: "1d",
//     });

//     res.status(200).json({
//       success: true,
//       token,
//       savedUser,
//       message: "User registered!",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message || "error in register",
//     });
//   }
// };

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
