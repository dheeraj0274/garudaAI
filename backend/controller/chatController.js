import {GoogleGenAI} from '@google/genai';


export const geminiResponse = async(req,res)=>{
    const {prompt} = req.body;
    const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
   try {
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config:{
             systemInstruction:'You are an AI model and your name is Garuda-AI , made by D&K'
        }
         })

         res.status(201).json({
            success:true,
            response
         })


         
    
   } catch (error) {
    res.status(500).json({
        success:false,
        message:'Failed to response',
        error:error.message
    })
    
   }

    
}