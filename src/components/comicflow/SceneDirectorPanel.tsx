"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clapperboard, Loader2, Sparkles } from "lucide-react";

interface SceneDirectorPanelProps {
  sceneAction: string;
  orientation: "landscape" | "portrait";
  isGenerating: boolean;
  onSceneActionChange: (action: string) => void;
  onOrientationChange: (orientation: "landscape" | "portrait") => void;
  onGenerate: () => void;
  canGenerate: boolean;
}

export function SceneDirectorPanel({
  sceneAction,
  orientation,
  isGenerating,
  onSceneActionChange,
  onOrientationChange,
  onGenerate,
  canGenerate,
}: SceneDirectorPanelProps) {
  return (
    <div className="bg-card rounded-lg p-5 border border-border">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
          <Clapperboard className="w-5 h-5 text-warning" />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">
            Scene Director
          </h2>
          <p className="text-xs text-muted-foreground">
            Describe the action
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-interface font-medium text-muted-foreground mb-2">
            Scene Action
          </label>
          <Textarea
            value={sceneAction}
            onChange={(e) => onSceneActionChange(e.target.value)}
            placeholder="What is your character doing? e.g., Standing heroically on a rooftop at sunset, cape flowing in the wind..."
            className="bg-secondary border-border text-foreground placeholder:text-tertiary font-mono text-sm min-h-[100px] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-interface font-medium text-muted-foreground mb-3">
            Panel Orientation
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onOrientationChange("landscape")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-interface font-medium transition-all duration-200 ${
                orientation === "landscape"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-3 border-2 border-current rounded-sm" />
                Landscape
              </span>
            </button>
            <button
              onClick={() => onOrientationChange("portrait")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-interface font-medium transition-all duration-200 ${
                orientation === "portrait"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="w-3 h-5 border-2 border-current rounded-sm" />
                Portrait
              </span>
            </button>
          </div>
        </div>

        <Button
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-interface font-semibold text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate Panel
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
