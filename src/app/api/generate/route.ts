import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userPrompt = body?.prompt;
    const size = body?.size || "1024x1024";
    const quality = body?.quality || "standard";
    const style = body?.style || "vivid";

    console.log("Received prompt:", userPrompt);
    console.log("Size:", size, "Quality:", quality, "Style:", style);

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

    const validSizes = ["1024x1024", "1792x1024", "1024x1792"] as const;
    const selectedSize = validSizes.includes(size as "1024x1024" | "1792x1024" | "1024x1792")
      ? (size as "1024x1024" | "1792x1024" | "1024x1792")
      : "1024x1024";

    const validQualities = ["standard", "hd"] as const;
    const selectedQuality = validQualities.includes(quality as "standard" | "hd")
      ? (quality as "standard" | "hd")
      : "standard";

    const validStyles = ["vivid", "natural"] as const;
    const selectedStyle = validStyles.includes(style as "vivid" | "natural")
      ? (style as "vivid" | "natural")
      : "vivid";

    console.log("Generating image with DALL-E 3...");

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: userPrompt.trim(),
      n: 1,
      size: selectedSize,
      quality: selectedQuality,
      style: selectedStyle,
      response_format: "url",
    });

    const imageData = response.data;
    if (!imageData || imageData.length === 0) {
      return NextResponse.json(
        { error: "No image data returned" },
        { status: 500 }
      );
    }

    const firstImage = imageData[0];
    const imageUrl = firstImage?.url;
    const revisedPrompt = firstImage?.revised_prompt;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image was generated" },
        { status: 500 }
      );
    }

    console.log("Image generated successfully");
    console.log("Revised prompt:", revisedPrompt);

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      revisedPrompt: revisedPrompt,
    });
  } catch (error: unknown) {
    console.error("Generation error:", error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        {
          error: "OpenAI API error",
          details: error.message,
          code: error.code
        },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate image", details: String(error) },
      { status: 500 }
    );
  }
}
