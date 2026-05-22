import {Router} from 'express'
import { settingStored } from '../controller/settingController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = Router();


router.post('/setting' , authMiddleware, settingStored);

export default router;

