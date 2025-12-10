import { NextRequest, NextResponse } from "next/server";

// Comic style system prompt to ensure consistent comic book aesthetic
const COMIC_STYLE_PREFIX = `Comic book style illustration, bold ink outlines, vibrant colors, halftone dot shading, dynamic composition, professional comic panel art, speech bubbles with cloud-like borders for dialogue, expressive characters, dramatic lighting, manga/western comic hybrid style. `;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userPrompt = body?.prompt;
    const dialogue = body?.dialogue; // Optional dialogue for speech bubble
    const resolution = body?.resolution || "720p";

    console.log("Received prompt:", userPrompt);
    console.log("Dialogue:", dialogue);

    if (!userPrompt || typeof userPrompt !== "string" || userPrompt.trim() === "") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.DECART_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "DECART_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Build the full prompt with comic style prefix and optional dialogue
    let fullPrompt = COMIC_STYLE_PREFIX + userPrompt.trim();
    
    if (dialogue && dialogue.trim()) {
      fullPrompt += `. Character has a speech bubble with cloud-like puffy border containing the text: "${dialogue.trim()}"`;
    }

    console.log("Full prompt to Decart:", fullPrompt);

    // Decart API uses FormData, not JSON!
    const formData = new FormData();
    formData.append("prompt", fullPrompt);
    formData.append("resolution", resolution);

    const response = await fetch("https://api.decart.ai/v1/generate/lucy-pro-t2i", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Decart API error:", response.status, errorText);
      return NextResponse.json(
        { error: `API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    // The API returns the image directly as binary data
    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    console.log("Image generated successfully, size:", imageBuffer.byteLength);

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image", details: String(error) },
      { status: 500 }
    );
  }
}
