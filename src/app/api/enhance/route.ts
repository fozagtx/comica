import { NextRequest, NextResponse } from "next/server";

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

    // Mock enhancement - adds some descriptive text
    const enhancements = [
      "highly detailed, 8k resolution, professional photography, cinematic lighting",
      "vibrant colors, sharp focus, dramatic composition, studio quality",
      "hyperrealistic, intricate details, award-winning, masterpiece",
      "beautiful lighting, high quality, detailed textures, professional",
    ];

    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    const enhancedPrompt = `${userPrompt.trim()}, ${randomEnhancement}`;

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
