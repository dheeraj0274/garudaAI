import { registerUser  , login, profile} from "../controller/authController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { geminiResponse } from "../controller/chatController.js";


const router = Router();


router.get('/register',registerUser);
router.post('/login', login);
router.get('/me' , authMiddleware , profile);
router.get('/prompt',authMiddleware,geminiResponse)


export default router;