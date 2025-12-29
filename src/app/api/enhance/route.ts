import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ENHANCE_SYSTEM_PROMPT = `You are an expert AI image prompt engineer. Your task is to take a user's basic image idea and transform it into a detailed, vivid, and highly effective prompt for DALL-E 3 image generation.

Guidelines for enhancement:
1. Add specific visual details (lighting, colors, textures, materials)
2. Include artistic style references when appropriate (e.g., "cinematic lighting", "hyperrealistic", "digital art")
3. Specify composition elements (perspective, framing, depth of field)
4. Add mood and atmosphere descriptors
5. Include quality boosters like "highly detailed", "8k resolution", "professional photography"
6. Keep the core concept intact while expanding on it
7. Make the prompt specific enough to generate consistent, high-quality results
8. Limit response to 200-300 words maximum

Return ONLY the enhanced prompt, no explanations or additional text.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userPrompt = body?.prompt;

    if (!userPrompt || typeof userPrompt !== "string" || userPrompt.trim() === "") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: ENHANCE_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Enhance this image prompt: "${userPrompt.trim()}"`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const enhancedPrompt = completion.choices[0]?.message?.content?.trim();

    if (!enhancedPrompt) {
      return NextResponse.json(
        { error: "Failed to enhance prompt" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      originalPrompt: userPrompt.trim(),
      enhancedPrompt: enhancedPrompt,
    });
  } catch (error) {
    console.error("Prompt enhancement error:", error);
    return NextResponse.json(
      { error: "Failed to enhance prompt", details: String(error) },
      { status: 500 }
    );
  }
}
