import { GlassCard } from "./glass-card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  trend?: number;
  icon?: LucideIcon;
  accent?: "primary" | "accent" | "safe" | "high";
  className?: string;
}

export function StatCard({ label, value, hint, trend, icon: Icon, accent = "primary", className }: StatCardProps) {
  const accentMap = {
    primary: "text-primary",
    accent: "text-accent",
    safe: "text-[color:var(--risk-safe)]",
    high: "text-[color:var(--risk-high)]",
  } as const;
  return (
    <GlassCard className={cn("p-5 hover:-translate-y-0.5 hover:shadow-glow", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-3xl font-display font-semibold text-foreground">{value}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        {Icon && (
          <div className={cn("rounded-xl p-2.5 bg-[color-mix(in_oklab,var(--primary)_12%,transparent)]", accentMap[accent])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span className={cn("font-medium", trend >= 0 ? "text-[color:var(--risk-safe)]" : "text-[color:var(--risk-high)]")}>
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend).toFixed(1)}%
          </span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
      )}
    </GlassCard>
  );
}