import { sendOtp  , login, profile} from "../controller/authController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendMessage } from "../controller/chatController.js";


const router = Router();


router.post('/sendOtp',sendOtp);
router.post('/login', login);
router.get('/me' , authMiddleware , profile);
router.get('/prompt',authMiddleware,sendMessage)


export default router;