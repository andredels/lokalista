"use server";

import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Groq client will be initialized in POST handler with validated API key

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is not set in environment variables");
      return NextResponse.json({ 
        error: "Groq API key is not configured. Please add GROQ_API_KEY to your .env.local file." 
      }, { status: 500 });
    }

    // Check if API key looks valid (starts with gsk_)
    if (!apiKey.startsWith('gsk_')) {
      console.error("GROQ_API_KEY format appears invalid (should start with 'gsk_')");
      return NextResponse.json({ 
        error: "Invalid API key format. Groq API keys should start with 'gsk_'." 
      }, { status: 500 });
    }

    const sanitizedMessages: ChatMessage[] = messages
      .filter((msg: ChatMessage) => msg && typeof msg.content === "string" && msg.content.trim().length > 0)
      .map((msg: ChatMessage) => ({
        role: msg.role,
        content: msg.content.trim(),
      }));

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ error: "No valid messages supplied." }, { status: 400 });
    }

    // Initialize client with validated API key
    const client = new Groq({
      apiKey: apiKey,
    });

    const model = process.env.GROQ_CHAT_MODEL || "llama-3.1-8b-instant";

    const completion = await client.chat.completions.create({
      model,
      messages: sanitizedMessages,
      temperature: 0.7,
      max_tokens: 800,
      top_p: 0.9,
    });

    return NextResponse.json(completion);
  } catch (error: unknown) {
    console.error("Groq chat route error:", error);
    
    // Handle specific Groq API errors
    const err = error as { status?: number; code?: string; message?: string; response?: { data?: { error?: { message?: string } } } };
    if (err?.status === 401 || err?.code === 'invalid_api_key') {
      return NextResponse.json({ 
        error: "Invalid API key. Please check your GROQ_API_KEY in .env.local file. Make sure it's correct and starts with 'gsk_'." 
      }, { status: 401 });
    }
    
    if (err?.status === 429) {
      return NextResponse.json({ 
        error: "Rate limit exceeded. Please try again in a moment." 
      }, { status: 429 });
    }
    
    const message =
      err?.response?.data?.error?.message ||
      err?.message ||
      "Unexpected error while generating chat response.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

