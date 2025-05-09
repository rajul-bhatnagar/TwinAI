import { askLlama } from "@/app/components/llamaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const aiResponse = await askLlama(message);
    return NextResponse.json({ reply: aiResponse }); // ✅ FIXED
  } catch (error) {
    console.error("LLaMA API Error:", error);
    return NextResponse.json({ reply: "Sorry, I couldn't process that.", error: true });
  }
}
