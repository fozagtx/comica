"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

interface CharacterProfileCardProps {
  characterName: string;
  characterDescription: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
}

export function CharacterProfileCard({
  characterName,
  characterDescription,
  onNameChange,
  onDescriptionChange,
}: CharacterProfileCardProps) {
  return (
    <div className="bg-card rounded-lg p-5 border border-border">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">
            Character DNA
          </h2>
          <p className="text-xs text-muted-foreground">
            Define once, use everywhere
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-interface font-medium text-muted-foreground mb-2">
            Character Name
          </label>
          <Input
            value={characterName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g., Captain Nova"
            className="bg-secondary border-border text-foreground placeholder:text-tertiary font-mono text-sm h-11"
          />
        </div>

        <div>
          <label className="block text-sm font-interface font-medium text-muted-foreground mb-2">
            Visual Description
          </label>
          <Textarea
            value={characterDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Describe your character's appearance in detail: hair color, clothing, distinctive features, art style..."
            className="bg-secondary border-border text-foreground placeholder:text-tertiary font-mono text-sm min-h-[140px] resize-none"
          />
          <p className="text-xs text-tertiary mt-2">
            Be specific for consistent results across panels
          </p>
        </div>
      </div>
    </div>
  );
}
