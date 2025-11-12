"use server";

import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Groq API key is not configured." }, { status: 500 });
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

    const model = process.env.GROQ_CHAT_MODEL || "llama-3.1-8b-instant";

    const completion = await client.chat.completions.create({
      model,
      messages: sanitizedMessages,
      temperature: 0.7,
      max_tokens: 800,
      top_p: 0.9,
    });

    return NextResponse.json(completion);
  } catch (error: any) {
    console.error("Groq chat route error:", error);
    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      "Unexpected error while generating chat response.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

