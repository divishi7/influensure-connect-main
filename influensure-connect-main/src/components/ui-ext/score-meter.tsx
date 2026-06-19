import { cn } from "@/lib/utils";

export function ScoreMeter({ score, label, size = "md", className }: { score: number; label?: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const color = score >= 80 ? "var(--risk-safe)" : score >= 60 ? "var(--risk-medium)" : "var(--risk-high)";
  const dim = size === "lg" ? 160 : size === "sm" ? 80 : 120;
  const stroke = size === "lg" ? 14 : size === "sm" ? 8 : 10;
  const r = (dim - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;

  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle cx={dim / 2} cy={dim / 2} r={r} stroke="var(--border)" strokeWidth={stroke} fill="none" />
          <circle
            cx={dim / 2} cy={dim / 2} r={r}
            stroke={color} strokeWidth={stroke} fill="none"
            strokeDasharray={`${dash} ${c}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-semibold" style={{ color }}>{score}</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">/ 100</span>
        </div>
      </div>
      {label && <span className="mt-2 text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}