"use client";

import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface GenerationStatusProps {
  status: "idle" | "generating" | "success" | "error";
  message?: string;
}

export function GenerationStatus({ status, message }: GenerationStatusProps) {
  if (status === "idle") return null;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
        status === "generating"
          ? "bg-warning/10 border border-warning/20"
          : status === "success"
          ? "bg-green-500/10 border border-green-500/20"
          : "bg-destructive/10 border border-destructive/20"
      }`}
    >
      {status === "generating" && (
        <Loader2 className="w-5 h-5 text-warning animate-spin" />
      )}
      {status === "success" && (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      )}
      {status === "error" && (
        <XCircle className="w-5 h-5 text-destructive" />
      )}
      <span
        className={`text-sm font-interface ${
          status === "generating"
            ? "text-warning"
            : status === "success"
            ? "text-green-500"
            : "text-destructive"
        }`}
      >
        {message ||
          (status === "generating"
            ? "Generating your panel..."
            : status === "success"
            ? "Panel generated successfully!"
            : "Generation failed. Please try again.")}
      </span>
    </div>
  );
}
