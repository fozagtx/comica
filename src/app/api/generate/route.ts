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

    // Mock image generation - returns a placeholder image
    const placeholderImages = [
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1024&h=1024&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1024&h=1024&fit=crop",
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1024&h=1024&fit=crop",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1024&h=1024&fit=crop",
    ];

    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];

    return NextResponse.json({
      success: true,
      imageUrl: randomImage,
      revisedPrompt: userPrompt.trim(),
    });
  } catch (error: unknown) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image", details: String(error) },
      { status: 500 }
    );
  }
}
