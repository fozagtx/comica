"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Sparkles,
  Mic,
  Wand2,
  Users,
  Palette,
  MessageCircle,
  Hexagon,
  Clock,
  Download,
  Loader2,
  ImageIcon,
  Square,
  RectangleHorizontal,
  RectangleVertical,
  X,
} from "lucide-react";

type ImageSize = "1024x1024" | "1792x1024" | "1024x1792";
type ImageQuality = "standard" | "hd";
type ImageStyle = "vivid" | "natural";

interface GeneratedImage {
  url: string;
  prompt: string;
  revisedPrompt?: string;
  timestamp: number;
}

export default function StudioPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  // Image generation options
  const [imageSize, setImageSize] = useState<ImageSize>("1024x1024");
  const [imageQuality, setImageQuality] = useState<ImageQuality>("standard");
  const [imageStyle, setImageStyle] = useState<ImageStyle>("vivid");

  const sizeOptions = [
    { value: "1024x1024" as ImageSize, label: "Square", icon: Square },
    { value: "1792x1024" as ImageSize, label: "Landscape", icon: RectangleHorizontal },
    { value: "1024x1792" as ImageSize, label: "Portrait", icon: RectangleVertical },
  ];

  const handleEnhancePrompt = async () => {
    if (!prompt.trim() || isEnhancing) return;
    setIsEnhancing(true);

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();

      if (data.success && data.enhancedPrompt) {
        setPrompt(data.enhancedPrompt);
      } else {
        console.error("Enhancement failed:", data.error);
      }
    } catch (error) {
      console.error("Enhancement failed:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          size: imageSize,
          quality: imageQuality,
          style: imageStyle,
        }),
      });
      const data = await response.json();

      if (data.success && data.imageUrl) {
        const newImage: GeneratedImage = {
          url: data.imageUrl,
          prompt: prompt,
          revisedPrompt: data.revisedPrompt,
          timestamp: Date.now(),
        };
        setGeneratedImages((prev) => [newImage, ...prev]);
        setSelectedImage(newImage);
      } else {
        console.error("Generation failed:", data.error);
      }
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (imageUrl: string, promptText: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compikzel-${promptText.slice(0, 30).replace(/\s+/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-dotted-grid" />
      <div className="absolute inset-0 bg-glow-green pointer-events-none" />
      <div className="absolute inset-0 bg-vignette pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-50 px-4 py-3 bg-[#0A0A0A]/80 backdrop-blur-sm border-b border-[#1E1E1E]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left - Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#0F1111] border border-[#1E1E1E] rounded-lg flex items-center justify-center">
                <Hexagon className="w-5 h-5 text-[#22F2B1]" strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#22F2B1] text-lg">Compikzel</span>
                <Badge
                  variant="outline"
                  className="bg-transparent border-[#16C79A]/30 text-[#9CA3AF] text-xs px-2 py-0.5 font-normal"
                >
                  Free Trial
                </Badge>
              </div>
            </div>

            {/* Center - Upgrade Alert */}
            <div className="hidden md:flex items-center gap-3 bg-[#0F1111] border border-[#1E1E1E] rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-[#9CA3AF]" />
              <span className="text-sm text-[#E5E7EB]">
                Skip Trial & Unlock All Credits
              </span>
              <Button
                size="sm"
                className="bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-semibold px-4 py-1 h-7 rounded-full"
              >
                Upgrade
              </Button>
            </div>

            {/* Right - Empty spacer for balance */}
            <div className="w-[100px]" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col lg:flex-row gap-6 px-4 py-6 max-w-7xl mx-auto w-full">
          {/* Left Panel - Prompt Input */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Prompt Input Card */}
            <div className="bg-[#0F1111] border border-[#1E1E1E] rounded-2xl p-4">
              {/* Textarea */}
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create... Be specific about style, colors, mood, and composition."
                className="
                  min-h-[140px] bg-transparent border-none resize-none
                  text-[#E5E7EB] placeholder:text-[#6B7280]
                  focus-visible:ring-0 focus-visible:ring-offset-0
                  text-base leading-relaxed
                "
              />

              {/* Image Options */}
              <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-[#1E1E1E]">
                {/* Size Options */}
                <div className="flex items-center gap-1 bg-[#1E1E1E]/50 rounded-full p-1">
                  {sizeOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = imageSize === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setImageSize(option.value)}
                        className={`
                          flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                          transition-all duration-200
                          ${
                            isActive
                              ? "bg-[#22F2B1] text-[#0A0A0A]"
                              : "text-[#9CA3AF] hover:text-[#E5E7EB]"
                          }
                        `}
                        title={option.label}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{option.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quality Toggle */}
                <button
                  onClick={() =>
                    setImageQuality((prev) =>
                      prev === "standard" ? "hd" : "standard"
                    )
                  }
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium border
                    transition-all duration-200
                    ${
                      imageQuality === "hd"
                        ? "bg-[#22F2B1]/20 border-[#22F2B1] text-[#22F2B1]"
                        : "border-[#1E1E1E] text-[#9CA3AF] hover:border-[#3E3E3E]"
                    }
                  `}
                >
                  HD
                </button>

                {/* Style Toggle */}
                <button
                  onClick={() =>
                    setImageStyle((prev) =>
                      prev === "vivid" ? "natural" : "vivid"
                    )
                  }
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium border
                    transition-all duration-200
                    ${
                      imageStyle === "vivid"
                        ? "bg-[#22F2B1]/20 border-[#22F2B1] text-[#22F2B1]"
                        : "border-[#1E1E1E] text-[#9CA3AF] hover:border-[#3E3E3E]"
                    }
                  `}
                >
                  {imageStyle === "vivid" ? "Vivid" : "Natural"}
                </button>
              </div>

              {/* Footer Controls */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1E1E1E]">
                {/* Left - Personas & Styles */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-[#1E1E1E] text-[#9CA3AF] hover:border-[#3E3E3E] hover:text-[#E5E7EB] hover:bg-[#1E1E1E] rounded-full px-4 h-9"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Personas
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-[#1E1E1E] text-[#9CA3AF] hover:border-[#3E3E3E] hover:text-[#E5E7EB] hover:bg-[#1E1E1E] rounded-full px-4 h-9"
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Styles
                  </Button>
                </div>

                {/* Right - Mic & Enhance */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-transparent border-[#1E1E1E] text-[#6B7280] hover:border-[#3E3E3E] hover:text-[#E5E7EB] hover:bg-[#1E1E1E] rounded-full w-9 h-9"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEnhancePrompt}
                    disabled={!prompt.trim() || isEnhancing}
                    className="bg-transparent border-[#1E1E1E] text-[#9CA3AF] hover:border-[#22F2B1] hover:text-[#22F2B1] hover:bg-[#22F2B1]/10 rounded-full px-4 h-9 disabled:opacity-50"
                  >
                    {isEnhancing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Wand2 className="w-4 h-4 mr-2" />
                    )}
                    {isEnhancing ? "Enhancing..." : "Enhance Prompt"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className={`
                  bg-[#22F2B1] hover:bg-[#1AD9A0] text-[#0A0A0A] font-semibold
                  rounded-full px-8 py-3 h-12 text-base
                  transition-all duration-300
                  hover:scale-105 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  ${!isGenerating && prompt.trim() ? "glow-green-strong animate-[pulse-glow_2s_ease-in-out_infinite]" : ""}
                `}
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 mr-2" />
                )}
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>

            {/* DALL-E 3 Badge */}
            <p className="text-center text-xs text-[#6B7280] mt-3">
              Powered by OpenAI DALL-E 3
            </p>
          </div>

          {/* Right Panel - Generated Images */}
          <div className="lg:w-[480px] flex flex-col">
            <h3 className="text-[#E5E7EB] font-medium text-sm mb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#22F2B1]" />
              Generated Images
              {generatedImages.length > 0 && (
                <Badge className="bg-[#22F2B1]/20 text-[#22F2B1] text-xs">
                  {generatedImages.length}
                </Badge>
              )}
            </h3>

            {/* Selected Image Preview */}
            {selectedImage ? (
              <div className="bg-[#0F1111] border border-[#1E1E1E] rounded-2xl overflow-hidden mb-4">
                <div className="relative aspect-square">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.prompt}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-[#0A0A0A]/80 rounded-full flex items-center justify-center hover:bg-[#0A0A0A] transition-colors"
                  >
                    <X className="w-4 h-4 text-[#9CA3AF]" />
                  </button>
                </div>
                <div className="p-4 border-t border-[#1E1E1E]">
                  <p className="text-xs text-[#9CA3AF] line-clamp-2 mb-3">
                    {selectedImage.revisedPrompt || selectedImage.prompt}
                  </p>
                  <Button
                    size="sm"
                    onClick={() =>
                      handleDownload(selectedImage.url, selectedImage.prompt)
                    }
                    className="w-full bg-[#1E1E1E] hover:bg-[#2E2E2E] text-[#E5E7EB] rounded-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-[#0F1111] border border-[#1E1E1E] rounded-2xl p-8 flex flex-col items-center justify-center text-center mb-4 aspect-square">
                <div className="w-16 h-16 bg-[#1E1E1E] rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-[#6B7280]" />
                </div>
                <p className="text-[#9CA3AF] text-sm">
                  Your generated images will appear here
                </p>
                <p className="text-[#6B7280] text-xs mt-1">
                  Enter a prompt and click Generate
                </p>
              </div>
            )}

            {/* Image Gallery */}
            {generatedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {generatedImages.map((image) => (
                  <button
                    key={image.timestamp}
                    onClick={() => setSelectedImage(image)}
                    className={`
                      relative aspect-square rounded-lg overflow-hidden border-2 transition-all
                      ${
                        selectedImage?.timestamp === image.timestamp
                          ? "border-[#22F2B1]"
                          : "border-transparent hover:border-[#3E3E3E]"
                      }
                    `}
                  >
                    <Image
                      src={image.url}
                      alt={image.prompt}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Floating Help Tab - Right Side */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
          <button className="bg-[#22F2B1] text-[#0A0A0A] font-medium text-sm px-2 py-4 rounded-l-lg hover:bg-[#1AD9A0] transition-colors">
            <span
              className="transform rotate-180"
              style={{ writingMode: "vertical-rl" }}
            >
              Can we help you?
            </span>
          </button>
        </div>

        {/* Floating Chat Button - Bottom Right */}
        <button className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0F1111] border border-[#1E1E1E] rounded-full flex items-center justify-center hover:border-[#3E3E3E] transition-all duration-200 hover:scale-105 shadow-lg">
          <MessageCircle className="w-6 h-6 text-[#9CA3AF]" />
        </button>
      </div>
    </div>
  );
}
