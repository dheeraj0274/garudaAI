import {GoogleGenAI} from '@google/genai';
import User from '../config/models/User';


const chatHistory = []


export const geminiResponse = async(req,res)=>{
    const {prompt , role } = req.body;
    const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
   try {
    const result = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:role==="user" ? chatHistory.role==='model' ? chatHistory.text : prompt :prompt,
        config:{
             systemInstruction:'You are an AI model and your name is Garuda-AI , made by D&K'
        }
         })

         res.status(201).json({
            success:true,
            result
         })

        const  reply = result.contents.part.text;

        console.log('text',reply)

        //  chathistory.push({
        //     role:"user",
        //     message:reply
        //  })
        chatHistory.push({
            role:'model',
            text:reply
        })


        //  console.log('chathistore ',chathistory)


       


         
    
   } catch (error) {
    res.status(500).json({
        success:false,
        message:'Failed to response',
        error:error.message
    })
    
   }

    
}

const setPrevreply ={

};

const getRole =async(role)=>{


    const role = req.body;

    if(chatHistory.role===role){
      setPrevreply={
        role:"User",
        text:chatHistory.map((index,item)=>
            {
            if(index===0){
                setPrevreply={
                    role:"user",
                    text:prompt
                }
               

            }
             else{
                    setPrevreply={
                        role:"user",
                        text:chatHistory[chatHistory.lastIndexOf()]
                    }
                }
        }

        )
      }
        
    }

}