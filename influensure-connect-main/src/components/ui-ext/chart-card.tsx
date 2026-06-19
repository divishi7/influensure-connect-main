import { GlassCard } from "./glass-card";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ChartCard({ title, description, action, children, className, height = 280 }: { title: string; description?: string; action?: ReactNode; children: ReactNode; className?: string; height?: number }) {
  return (
    <GlassCard className={cn("p-5", className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display text-base font-semibold">{title}</h3>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {action}
      </div>
      <div style={{ height }}>{children}</div>
    </GlassCard>
  );
}