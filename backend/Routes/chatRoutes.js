import authMiddleware from "../middleware/authMiddleware.js";


import { newChat , deleteChat, sendMessage, getAllChat, chatById } from "../controller/chatController.js";

import { Router } from "express";

const router = Router();


router.delete('/delete/:chatId',authMiddleware, deleteChat);
router.post('/newchat', authMiddleware,newChat);
router.post('/prompt' , authMiddleware , sendMessage)
router.post('/allchat',authMiddleware, getAllChat)
router.get('/:id',authMiddleware,chatById)

export default router;