import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })
import passport from "passport";

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, data) => {

    if (err || !data) {
      console.log("Google Auth Error:", err);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=google`);
    }

    const { token, user } = data;

    console.log("Generated Token:", token);  

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure:true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${process.env.FRONTEND_URL}/`);
  })(req, res, next);
};


