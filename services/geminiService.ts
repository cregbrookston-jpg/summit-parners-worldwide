
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

let chat: Chat | null = null;

const getChatInstance = () => {
  if (!chat) {
     chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are 'iWholesale Assistant', a friendly and knowledgeable expert on Apple iPhones. Your purpose is to help customers who are buying iPhones in bulk. You can answer questions about product specifications, compare models, explain bulk pricing, and provide purchasing recommendations. Keep your answers concise and helpful for a business-to-business audience. Format your responses using markdown for better readability.`,
      },
    });
  }
  return chat;
}

export const streamChatResponse = (message: string) => {
  const chatInstance = getChatInstance();
  return chatInstance.sendMessageStream({ message });
};
