import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg gradient-bg text-primary-foreground shadow-glow">
        <Sparkles className="h-4 w-4" />
      </span>
      {showText && <span className="font-display text-lg font-semibold tracking-tight">Influensure</span>}
    </div>
  );
}