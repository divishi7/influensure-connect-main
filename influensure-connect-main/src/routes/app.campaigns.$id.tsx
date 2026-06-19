import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { StatCard } from "@/components/ui-ext/stat-card";
import { ChartCard } from "@/components/ui-ext/chart-card";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { getCampaign } from "@/lib/mock/campaigns";
import { formatCurrency, formatNumber } from "@/lib/format";
import { Users, Eye, MousePointerClick, TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { engagementTrend } from "@/lib/mock/analytics";

export const Route = createFileRoute("/app/campaigns/$id")({
  head: () => ({ meta: [{ title: "Campaign — Influensure" }] }),
  component: CampaignDetail,
});

function CampaignDetail() {
  const { id } = useParams({ from: "/app/campaigns/$id" });
  const c = getCampaign(id);
  if (!c) return <div>Not found</div>;

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="mb-3 -ml-2"><Link to="/app/campaigns"><ArrowLeft className="h-4 w-4 mr-1" /> Back to campaigns</Link></Button>
      <PageHeader title={c.name} description={`${c.brand} · ${c.category} · ${c.startDate} → ${c.endDate}`} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Reach" value={formatNumber(c.reach)} icon={Eye} />
        <StatCard label="Engagement" value={formatNumber(c.engagement)} icon={Users} accent="accent" />
        <StatCard label="Conversions" value={formatNumber(c.conversions)} icon={MousePointerClick} accent="safe" />
        <StatCard label="ROI" value={`${c.roi}%`} icon={TrendingUp} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <ChartCard title="Engagement over campaign" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementTrend}>
              <defs><linearGradient id="cd" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatNumber(v as number)} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="engagement" stroke="var(--primary)" strokeWidth={2} fill="url(#cd)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <GlassCard className="p-5">
          <h3 className="font-display font-semibold mb-3">Budget</h3>
          <p className="text-3xl font-display font-semibold">{formatCurrency(c.spent)}<span className="text-sm text-muted-foreground"> / {formatCurrency(c.budget)}</span></p>
          <div className="h-2 rounded-full bg-muted mt-3 overflow-hidden"><div className="h-full gradient-bg" style={{ width: `${Math.min(100, (c.spent / c.budget) * 100)}%` }} /></div>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex justify-between"><span className="text-muted-foreground">Impressions</span><span>{formatNumber(c.impressions)}</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Clicks</span><span>{formatNumber(c.clicks)}</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Revenue</span><span>{formatCurrency(c.revenue)}</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Creators</span><span>{c.influencers}</span></li>
          </ul>
        </GlassCard>
      </div>
    </>
  );
}