
import { formateGemini } from "../utils/formatForGemini.js";
import { geminiresponse } from "../services/gemini.js";
import chat from "../config/models/chat.js";

export const sendMessage = async (req, res) => {
  const { chatId, prompt } = req.body;
  const userId = req.user._id;

  try {
    let userChat = await chat.findById(chatId);
    console.log('chat',userChat);
    

    if (!userChat) {
      userChat = await chat.create({ userId, messages: [] });
    }

    userChat.messages.push({ role: "user", text: prompt });

    const recentMessages = userChat.messages.slice(-10);
    console.log('recent ', recentMessages);
    

    const contents = formateGemini(recentMessages);

    const reply = await geminiresponse(contents);

    userChat.messages.push({ role: "model", text: reply });

    await userChat.save();

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
