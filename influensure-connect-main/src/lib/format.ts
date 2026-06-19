export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return n.toString();
}

export function formatCurrency(n: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
}

export function formatPercent(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`;
}

export function riskLabel(score: number): "safe" | "medium" | "high" {
  if (score >= 80) return "safe";
  if (score >= 60) return "medium";
  return "high";
}

export function riskColor(label: "safe" | "medium" | "high"): string {
  return label === "safe" ? "var(--risk-safe)" : label === "medium" ? "var(--risk-medium)" : "var(--risk-high)";
}