import { cn } from "@/lib/utils";
import type { Risk } from "@/lib/mock/influencers";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";

export function RiskBadge({ risk, className }: { risk: Risk; className?: string }) {
  const config = {
    safe: { label: "Safe", icon: ShieldCheck, bg: "bg-[color-mix(in_oklab,var(--risk-safe)_18%,transparent)]", fg: "text-[color:var(--risk-safe)]" },
    medium: { label: "Medium Risk", icon: AlertTriangle, bg: "bg-[color-mix(in_oklab,var(--risk-medium)_22%,transparent)]", fg: "text-[color:var(--risk-medium)]" },
    high: { label: "High Risk", icon: ShieldAlert, bg: "bg-[color-mix(in_oklab,var(--risk-high)_20%,transparent)]", fg: "text-[color:var(--risk-high)]" },
  }[risk];
  const Icon = config.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", config.bg, config.fg, className)}>
      <Icon className="h-3 w-3" /> {config.label}
    </span>
  );
}