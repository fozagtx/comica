"use client";

import { useState, useCallback } from "react";
import { CharacterProfileCard } from "@/components/comicflow/CharacterProfileCard";
import { SceneDirectorPanel } from "@/components/comicflow/SceneDirectorPanel";
import { MainCanvas } from "@/components/comicflow/MainCanvas";
import { StoryBoardGrid } from "@/components/comicflow/StoryBoardGrid";
import { GenerationStatus } from "@/components/comicflow/GenerationStatus";
import { Zap } from "lucide-react";
import Link from "next/link";

interface Panel {
  id: string;
  imageUrl: string;
  sceneAction: string;
}

// Sample images for demo purposes
const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80",
  "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&q=80",
  "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=800&q=80",
  "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80",
];

export default function StudioPage() {
  // Character state
  const [characterName, setCharacterName] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");

  // Scene state
  const [sceneAction, setSceneAction] = useState("");
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<"idle" | "generating" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Panels state
  const [panels, setPanels] = useState<Panel[]>([]);
  const [currentPanel, setCurrentPanel] = useState<Panel | null>(null);

  const canGenerate = characterName.trim() !== "" && characterDescription.trim() !== "" && sceneAction.trim() !== "";

  const handleGenerate = useCallback(async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    setGenerationStatus("generating");
    setStatusMessage("Creating your comic panel with AI...");

    // Simulate API call with demo images
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const newPanel: Panel = {
      id: Date.now().toString(),
      imageUrl: DEMO_IMAGES[panels.length % DEMO_IMAGES.length],
      sceneAction: sceneAction,
    };

    // Add to panels (max 4)
    setPanels((prev) => {
      const updated = [newPanel, ...prev];
      return updated.slice(0, 4);
    });

    setCurrentPanel(newPanel);
    setIsGenerating(false);
    setGenerationStatus("success");
    setStatusMessage("Panel generated successfully!");

    // Clear status after 3 seconds
    setTimeout(() => {
      setGenerationStatus("idle");
    }, 3000);
  }, [canGenerate, sceneAction, panels.length]);

  const handlePanelClick = useCallback((panel: Panel) => {
    setCurrentPanel(panel);
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  ComicFlow
                </h1>
                <p className="text-xs text-muted-foreground font-interface">
                  Narrative Comic Creation Studio
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-interface font-medium">
                AI-Powered
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[1800px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
            {/* Left Sidebar */}
            <aside className="space-y-6">
              <CharacterProfileCard
                characterName={characterName}
                characterDescription={characterDescription}
                onNameChange={setCharacterName}
                onDescriptionChange={setCharacterDescription}
              />

              <SceneDirectorPanel
                sceneAction={sceneAction}
                orientation={orientation}
                isGenerating={isGenerating}
                onSceneActionChange={setSceneAction}
                onOrientationChange={setOrientation}
                onGenerate={handleGenerate}
                canGenerate={canGenerate}
              />

              {generationStatus !== "idle" && (
                <GenerationStatus status={generationStatus} message={statusMessage} />
              )}
            </aside>

            {/* Main Canvas Area */}
            <div className="space-y-6">
              <MainCanvas
                currentPanel={currentPanel?.imageUrl || null}
                orientation={orientation}
                isGenerating={isGenerating}
              />

              <StoryBoardGrid
                panels={panels}
                currentPanelId={currentPanel?.id || null}
                onPanelClick={handlePanelClick}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border mt-12 py-6">
          <div className="max-w-[1800px] mx-auto px-6 flex items-center justify-between">
            <p className="text-xs text-tertiary font-interface">
              ComicFlow — Professional Comic Panel Generation
            </p>
            <p className="text-xs text-tertiary font-mono">
              Character consistency powered by AI
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
