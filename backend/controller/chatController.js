
import { formateGemini } from "../utils/formatForGemini.js";
import { geminiresponse } from "../services/gemini.js";
import chat from "../config/models/chat.js";
import mongoose from "mongoose";
import {deleteCachedMessages, getCachedMessages , setCachedMessages} from '../utils/chatCache.js'


export const sendMessage = async (req, res) => {
  const { chatId, prompt } = req.body;
  const userId = req.user._id;

  try {
    let userChat = await chat.findById(chatId);
    console.log('chat',userChat);
    const title = prompt.slice(0,10);
    


    if (!userChat) {
      userChat = await chat.create({ userId, messages: [] ,title });
    }
    if(userChat.title==='New chat') await userChat.updateOne({title:title})

    userChat.messages.push({ role: "user", text: prompt });

    const recentMessages = userChat.messages.slice(-10);
    console.log('recent ', recentMessages);
    

    const contents = formateGemini(recentMessages);

    const reply = await geminiresponse(contents);
    console.log('reply',reply)
    
   
    userChat.messages.push({ role: "model", text: reply  });
    

    await userChat.save();
    

    const  messageForCache=await userChat.messages.slice(-30);
    await setCachedMessages(userChat._id.toString(),messageForCache);

    res.status(201).json({
      success: true,
      reply,
      chatId: userChat._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      
    });
  }
};


export const deleteChat =async (req,res)=>{
  const {chatId} = req.params;

  const deleteChat= await chat.findByIdAndDelete({
    _id:chatId,
    userId:req.user._id
   });
 await deleteCachedMessages(chatId)
   if(!deleteChat) return res.status(404).json({
    success:false,
    message:'chat not found'
   })

   res.status(200).json({
    success:true,
    message:'deleted successfully'
   })


}


export const newChat=async (req,res)=>{

  const userId= req.user._id;

  const newChat = await  chat.create({userId , messages:[]});

  res.status(200).json({
    success:true,
    chatId:newChat._id,
    message:'new chat created'
  })



}

export const getAllChat= async(req,res)=>{
  const user = req.user._id;
  
  const  allChats = await chat.find({userId:user});
  console.log('chats',allChats);
  
  

  res.status(200).json({
    success:true,
    message:'all chat sent successfully',
    allChats
  })


}


export const chatById =async(req,res)=>{
   const chatid=req.params.id;
                 const userId = req.user._id
                 console.log('chatid',chatid);
                 console.log(userId);
                 
                 

  try {
      const chats=await chat.findOne({
                  _id:new mongoose.Types.ObjectId(chatid) ,
                  userId:new mongoose.Types.ObjectId(userId)
                 }).select('userId title isArchieved createdAt updatedAt');
                 console.log('chat',chats)

                 if(!chats){
                  return res.status(404).json({
                    success:false,
                    message:'chat not found'
                  })

                 }


                 const cachedMessaegs = await getCachedMessages(chatid);
             console.log('from redis' , cachedMessaegs);
                
                 if(cachedMessaegs){
                  return res.status(200).json({
                    success:true,
                    message:'loaded from redis',
                    chats:{
                      ...chats.toObject(),
                      messages:cachedMessaegs

                    }
                  })
                 }

                 const messages =await chat.findById(chatid).select("messages").lean()
                 

                 const recentMessage = messages.messages.slice(-30);
               
                 await setCachedMessages(chatid , recentMessage);
                

                 console.log('messages loaded from mongodb');
                 
                 return res.status(200).json({
                  success:true,
                  ...chats.toObject(),
                  messages:recentMessage
                 })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:'false',
      error:error
    })
    
  }
                

               


}

 
