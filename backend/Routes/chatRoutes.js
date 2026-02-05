import authMiddleware from "../middleware/authMiddleware.js";


import { newChat , deleteChat } from "../controller/chatController.js";

import { Router } from "express";

const router = Router();


router.delete('/delete/:chatId',authMiddleware, deleteChat);
router.post('/newchat', authMiddleware,newChat)

export default router;