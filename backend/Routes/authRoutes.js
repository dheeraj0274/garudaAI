import { sendOtp  , login, profile, verifyOtpAndRegister} from "../controller/authController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendMessage } from "../controller/chatController.js";


const router = Router();


router.post('/sendOtp',sendOtp);
router.post('/verifyandregister', verifyOtpAndRegister);
router.get('/me' , authMiddleware , profile);
router.get('/prompt',authMiddleware,sendMessage)


export default router;