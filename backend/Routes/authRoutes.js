import { sendOtp  , login, profile, verifyOtpAndRegister} from "../controller/authController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendMessage } from "../controller/chatController.js";

import { googleAuthCallback } from "../controller/googleAuthController.js";
import passport from "passport";




const router = Router();


router.post('/sendOtp',sendOtp);
router.post('/verifyandregister', verifyOtpAndRegister);
router.get('/me' , authMiddleware , profile);
router.get('/prompt',authMiddleware,sendMessage)

router.post('/login' , login)
router.get('/google',passport.authenticate("google",{
    scope:['email','profile']
}))

router.get('/google/callback',googleAuthCallback)


export default router;