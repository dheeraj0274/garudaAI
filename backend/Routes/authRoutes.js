import { registerUser } from "../controller/authController.js";
import { Router } from "express";


const router = Router();


router.get('/register',registerUser);


export default router;