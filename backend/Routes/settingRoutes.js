import {Router} from 'express'
import { fetchSetting,  updateSettings } from '../controller/settingController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = Router();


router.post('/setting' , authMiddleware,updateSettings );
router.get('/getSetting', authMiddleware, fetchSetting)

export default router;

