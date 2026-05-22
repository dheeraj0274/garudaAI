import {Router} from 'express'
import { fetchSetting, settingStored } from '../controller/settingController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = Router();


router.post('/setting' , authMiddleware, settingStored);
router.get('/getSetting', authMiddleware, fetchSetting)

export default router;

