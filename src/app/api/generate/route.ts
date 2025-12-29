import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userPrompt = body?.prompt;
    const size = body?.size || "1024x1024"; // Options: 1024x1024, 1792x1024, 1024x1792
    const quality = body?.quality || "standard"; // Options: standard, hd
    const style = body?.style || "vivid"; // Options: vivid, natural

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

    // Validate size option
    const validSizes = ["1024x1024", "1792x1024", "1024x1792"] as const;
    const selectedSize = validSizes.includes(size as typeof validSizes[number])
      ? size as typeof validSizes[number]
      : "1024x1024";

    // Validate quality option
    const validQualities = ["standard", "hd"] as const;
    const selectedQuality = validQualities.includes(quality as typeof validQualities[number])
      ? quality as typeof validQualities[number]
      : "standard";

    // Validate style option
    const validStyles = ["vivid", "natural"] as const;
    const selectedStyle = validStyles.includes(style as typeof validStyles[number])
      ? style as typeof validStyles[number]
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

    if (!response.data || response.data.length === 0) {
      return NextResponse.json(
        { error: "No image data returned" },
        { status: 500 }
      );
    }

    const imageUrl = response.data[0].url;
    const revisedPrompt = response.data[0].revised_prompt;

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

    // Handle OpenAI-specific errors
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
