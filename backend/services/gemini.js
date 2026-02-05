import { GoogleGenAI } from "@google/genai";

export const geminiresponse = async (chatHistory) => {
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

  const reply = result.candidates[0].content.parts[0].text;
  return reply;
};
