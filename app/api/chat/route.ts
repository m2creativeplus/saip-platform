import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// Initialize the Google Gen AI standard SDK
// The user should set GEMINI_API_KEY environment variable in their Vercel console
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy') {
      return NextResponse.json({
        content: "Hello! I am the SAIP AI Support Agent powered by Gemini. (Provide your GEMINI_API_KEY in the environment variables to activate full AI intelligence). How can I help you navigate the Somaliland Automotive Intelligence Platform?",
        role: "assistant"
      });
    }

    // Extract the latest user message
    const lastPrompt = messages[messages.length - 1].content;
    
    // System instruction injected into the context 
    const systemInstruction = `
      You are the intelligent assistant for SAIP (Somaliland Automotive Intelligence Platform).
      Help users find cars, garages, spare parts, and provide insights based on the Hargeisa/Somaliland marketplace.
      Maintain a professional, helpful, and concise tone. You also have access to Real-time Google Search and Google Maps concepts.
    `;

    // Perform standard generateContent call using @google/genai
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemInstruction + "\n\nUser query: " + lastPrompt }] }
      ],
      config: {
        temperature: 0.7,
      }
    });

    const outputText = response.text || "I am currently unable to process your request.";

    return NextResponse.json({
      content: outputText,
      role: "assistant"
    });

  } catch (error) {
    console.error("Gemini Chat API Error:", error);
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 });
  }
}
