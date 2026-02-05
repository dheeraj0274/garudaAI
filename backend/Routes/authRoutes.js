import { registerUser  , login, profile} from "../controller/authController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendMessage } from "../controller/chatController.js";


const router = Router();


router.post('/register',registerUser);
router.post('/login', login);
router.get('/me' , authMiddleware , profile);
router.get('/prompt',authMiddleware,sendMessage)


export default router;