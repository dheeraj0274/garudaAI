import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })
import passport from "passport";

// export const googleAuthCallback = (req, res, next) => {
//     passport.authenticate(
//         "google",
//         { session: false },
//         (err, data, info) => {
//             if (err) return res.status(500).json({ success: false, message: err.message });

//             if (!data) {
//                 // Passport strategy returned false, e.g., already registered
//                 return res.status(409).json({ success: false, message: info?.message || "Login failed" });
//             }

//             const { token, user } = data;

//             // Set token in cookie
//             res.cookie("token", token, {
//                 httpOnly: true,
//                 sameSite: "strict",
//                 secure: process.env.NODE_ENV === "production",
//                 maxAge: 24 * 60 * 60 * 1000,
//             });

//             // Send response
//             // return res.status(200).json({
//             //     success: true,
//             //     message: "User registered / logged in successfully",
//             //     user,
//             // });
            
//             return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
//         }
//     )(req, res, next);
// };

// .env




export const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, data) => {
    if (err || !data) return res.redirect(`${process.env.FRONTEND_URL}/login?error=google`);

    const { token, user } = data;

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    });

 
    return res.redirect(`${process.env.FRONTEND_URL}/`);
  })(req, res, next);
};

