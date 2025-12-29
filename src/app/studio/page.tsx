"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Mic,
  Wand2,
  Users,
  Palette,
  RefreshCw,
  Pencil,
  AlignLeft,
  BarChart3,
  MessageCircle,
  Hexagon,
  Clock,
  Zap,
} from "lucide-react";

type TabType = "prompt" | "recreate" | "edit" | "title" | "analyze";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<TabType>("prompt");
  const [prompt, setPrompt] = useState(
    'A skeleton holding a smartphone, a melting brain dripping green slime, & the bold text "BRAIN ROT." in a neon, glitchy style'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits] = useState(40);

  const tabs = [
    { id: "prompt" as TabType, label: "Prompt", icon: Sparkles },
    { id: "recreate" as TabType, label: "Recreate", icon: RefreshCw },
    { id: "edit" as TabType, label: "Edit", icon: Pencil },
    { id: "title" as TabType, label: "Title", icon: AlignLeft },
    { id: "analyze" as TabType, label: "Analyze", icon: BarChart3, isNew: true },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, orientation: "landscape" }),
      });
      const data = await response.json();
      console.log("Generated:", data);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
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
        <header className="sticky top-0 z-50 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left - Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#0F1111] border border-[#1E1E1E] rounded-lg flex items-center justify-center">
                <Hexagon className="w-5 h-5 text-[#22F2B1]" strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#22F2B1]">Essential</span>
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

            {/* Right - Credits */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#22F2B1]/20 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-[#22F2B1]" />
              </div>
              <span className="text-sm">
                <span className="font-semibold text-[#E5E7EB]">{credits}</span>
                <span className="text-[#9CA3AF]"> Credits</span>
              </span>
              <span className="text-xs text-[#6B7280] hidden sm:inline">
                left before trial ends
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-2xl">
            {/* Get Started Title & Tabs Row */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#22F2B1] font-medium text-sm">Get Started</h2>

              {/* Tabs */}
              <div className="flex items-center gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-[#22F2B1] text-[#0A0A0A] tab-active-glow"
                            : "bg-transparent border border-[#1E1E1E] text-[#9CA3AF] hover:border-[#3E3E3E] hover:text-[#E5E7EB]"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                      {tab.isNew && (
                        <Badge className="absolute -top-2 -right-1 bg-[#22F2B1] text-[#0A0A0A] text-[10px] px-1.5 py-0 font-semibold">
                          NEW
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prompt Input Card */}
            <div className="bg-[#0F1111] border border-[#1E1E1E] rounded-2xl p-4">
              {/* Textarea */}
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="
                  min-h-[120px] bg-transparent border-none resize-none
                  text-[#E5E7EB] placeholder:text-[#6B7280]
                  focus-visible:ring-0 focus-visible:ring-offset-0
                  text-base leading-relaxed
                "
              />

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
                    className="bg-transparent border-[#1E1E1E] text-[#6B7280] hover:border-[#3E3E3E] hover:text-[#E5E7EB] hover:bg-[#1E1E1E] rounded-full px-4 h-9"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Enhance Prompt
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
                <Sparkles className="w-5 h-5 mr-2" />
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        </main>

        {/* Floating Help Tab - Right Side */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
          <button className="bg-[#22F2B1] text-[#0A0A0A] font-medium text-sm px-2 py-4 rounded-l-lg hover:bg-[#1AD9A0] transition-colors writing-mode-vertical">
            <span className="transform rotate-180" style={{ writingMode: "vertical-rl" }}>
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
