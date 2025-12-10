"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface MainCanvasProps {
  currentPanel: string | null;
  orientation: "landscape" | "portrait";
  isGenerating: boolean;
}

export function MainCanvas({
  currentPanel,
  orientation,
  isGenerating,
}: MainCanvasProps) {
  const aspectRatio = orientation === "landscape" ? "16/10" : "3/4";

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
          currentPanel ? "border-4 border-primary shadow-lg shadow-primary/20" : "border-2 border-dashed border-border"
        }`}
        style={{ aspectRatio }}
      >
        {isGenerating && (
          <div className="absolute inset-0 bg-card z-10 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-sm font-interface text-muted-foreground animate-pulse">
              Creating your panel...
            </p>
            <div className="mt-2 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {currentPanel ? (
          <Image
            src={currentPanel}
            alt="Generated comic panel"
            fill
            className={`object-cover transition-all duration-400 ease-out ${
              isGenerating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/50">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-4">
              <ImageIcon className="w-10 h-10 text-tertiary" />
            </div>
            <p className="text-muted-foreground font-interface text-sm">
              Your generated panel will appear here
            </p>
            <p className="text-tertiary text-xs mt-1">
              Define a character and scene to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
