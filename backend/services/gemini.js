// import { GoogleGenAI } from "@google/genai";

// export const geminiresponse = async (chatHistory) => {
//   const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//   });

//   const result = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: chatHistory,
//     config: {
//       systemInstruction:
//         "You are an AI model and your name is Garuda-AI, made by D&K",
//     },
//   });

//   const reply = result.candidates[0].content.parts[0].text;
//   return reply;
// };



import { GoogleGenAI } from "@google/genai";

export const geminiresponse = async (chatHistory) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: chatHistory,
      config: {
        systemInstruction:
          "You are an AI model and your name is Garuda-AI, made by D&K",
      },
    });

    if (!result?.candidates?.length) {
      console.log("Gemini bad response:", result);
      throw new Error("No valid Gemini response");
    }

    return result.candidates[0].content.parts[0].text;

  } catch (error) {
    console.log("Gemini Error:", error);
    throw error;
  }
};
