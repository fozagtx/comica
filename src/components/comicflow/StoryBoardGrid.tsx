"use client";

import Image from "next/image";
import { Film } from "lucide-react";

interface Panel {
  id: string;
  imageUrl: string;
  sceneAction: string;
}

interface StoryBoardGridProps {
  panels: Panel[];
  currentPanelId: string | null;
  onPanelClick: (panel: Panel) => void;
}

export function StoryBoardGrid({
  panels,
  currentPanelId,
  onPanelClick,
}: StoryBoardGridProps) {
  if (panels.length === 0) {
    return (
      <div className="bg-card rounded-lg p-5 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Film className="w-4 h-4 text-tertiary" />
          </div>
          <h3 className="font-display text-sm font-bold text-muted-foreground">
            Story Board
          </h3>
        </div>
        <div className="flex items-center justify-center py-8 border-2 border-dashed border-border rounded-lg">
          <p className="text-tertiary text-sm font-interface">
            Generated panels will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-5 border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Film className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-display text-sm font-bold text-foreground">
          Story Board
        </h3>
        <span className="ml-auto text-xs text-tertiary font-mono">
          {panels.length}/4 panels
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {panels.map((panel, index) => (
          <button
            key={panel.id}
            onClick={() => onPanelClick(panel)}
            className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              currentPanelId === panel.id
                ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                : "hover:ring-1 hover:ring-primary/50"
            }`}
            style={{
              animationDelay: `${index * 80}ms`,
            }}
          >
            <Image
              src={panel.imageUrl}
              alt={panel.sceneAction}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200">
              <div className="absolute bottom-1 left-1 right-1">
                <p className="text-[10px] text-white font-interface truncate">
                  {panel.sceneAction}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
