import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { Plus } from "lucide-react";
import { campaigns } from "@/lib/mock/campaigns";
import { formatCurrency, formatNumber } from "@/lib/format";

export const Route = createFileRoute("/app/campaigns/")({
  head: () => ({ meta: [{ title: "Campaigns — Influensure" }] }),
  component: CampaignsList,
});

const statusColor: Record<string, string> = {
  Active: "var(--risk-safe)", Completed: "var(--primary)", Draft: "var(--muted-foreground)", Paused: "var(--risk-medium)",
};

function CampaignsList() {
  return (
    <>
      <PageHeader
        title="Campaigns"
        description="Plan, run, and measure all your influencer campaigns."
        actions={<GradientButton asChild><Link to="/app/campaigns/new"><Plus className="h-4 w-4 mr-1" /> New campaign</Link></GradientButton>}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((c) => (
          <Link to="/app/campaigns/$id" params={{ id: c.id }} key={c.id}>
            <GlassCard className="p-5 h-full hover:-translate-y-0.5 hover:shadow-glow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">{c.brand}</p>
                  <h3 className="font-display font-semibold">{c.name}</h3>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: `color-mix(in oklab, ${statusColor[c.status]} 18%, transparent)`, color: statusColor[c.status] }}>{c.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="glass rounded-lg p-2"><p className="text-[10px] uppercase text-muted-foreground">Reach</p><p className="font-display text-sm font-semibold">{formatNumber(c.reach)}</p></div>
                <div className="glass rounded-lg p-2"><p className="text-[10px] uppercase text-muted-foreground">ROI</p><p className="font-display text-sm font-semibold gradient-text">{c.roi}%</p></div>
                <div className="glass rounded-lg p-2"><p className="text-[10px] uppercase text-muted-foreground">Budget</p><p className="font-display text-sm font-semibold">{formatCurrency(c.budget)}</p></div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">{c.influencers} creators · {c.category}</div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </>
  );
}