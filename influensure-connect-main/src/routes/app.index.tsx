import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { StatCard } from "@/components/ui-ext/stat-card";
import { ChartCard } from "@/components/ui-ext/chart-card";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { Users, ShieldCheck, Sparkles, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react";
import { dashboardStats, engagementTrend, audienceGrowth, campaignPerformance, fraudRiskDistribution } from "@/lib/mock/analytics";
import { formatNumber, formatPercent } from "@/lib/format";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { InfluencerCard } from "@/components/influencer/influencer-card";
import { influencers } from "@/lib/mock/influencers";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Influensure" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const topInfluencers = influencers.slice(0, 3);
  return (
    <>
      <PageHeader
        title="Welcome back, Divishi👋"
        description="Here's what's happening across your creator marketing today."
        actions={
          <GradientButton asChild>
            <Link to="/app/campaigns/new">New campaign <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </GradientButton>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Influencers" value={formatNumber(dashboardStats.totalInfluencers)} icon={Users} trend={8.4} />
        <StatCard label="Verified Influencers" value={formatNumber(dashboardStats.verifiedInfluencers)} icon={ShieldCheck} trend={12.1} accent="safe" />
        <StatCard label="Active Campaigns" value={dashboardStats.activeCampaigns} icon={Sparkles} trend={4.2} accent="accent" />
        <StatCard label="Campaign ROI" value={`${dashboardStats.campaignROI}%`} icon={TrendingUp} trend={18.6} />
        <StatCard label="Fraud Alerts" value={dashboardStats.fraudAlerts} icon={AlertTriangle} trend={-22.4} accent="high" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <ChartCard title="Engagement trend" description="Monthly authentic engagement & reach" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementTrend}>
              <defs>
                <linearGradient id="e1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
                <linearGradient id="e2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35}/><stop offset="100%" stopColor="var(--accent)" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatNumber(v as number)} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="reach" stroke="var(--accent)" strokeWidth={2} fill="url(#e2)" />
              <Area type="monotone" dataKey="engagement" stroke="var(--primary)" strokeWidth={2} fill="url(#e1)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Fraud risk distribution" description="Across your watchlist">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={fraudRiskDistribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                {fraudRiskDistribution.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <ChartCard title="Campaign performance" description="ROI by campaign">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignPerformance}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v) => `${v}%`} />
              <Bar dataKey="roi" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Audience growth" description="Total audience across creators">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={audienceGrowth}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatNumber(v as number)} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v) => formatNumber(v as number)} />
              <Line type="monotone" dataKey="audience" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--accent)" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">Top recommended creators</h2>
          <Link to="/app/discover" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {topInfluencers.map((i) => <InfluencerCard key={i.id} inf={i} />)}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <GlassCard className="p-5 lg:col-span-2">
          <h3 className="font-display font-semibold mb-3">Recent fraud alerts</h3>
          <ul className="space-y-3">
            {[
              { name: "Lara", reason: "98% engagement from inactive accounts", risk: "High" },
              { name: "Anushka", reason: "Sudden 40K follower spike in 2 days", risk: "High" },
              { name: "Riyan", reason: "Comment bot patterns detected", risk: "Medium" },
            ].map((a) => (
              <li key={a.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                <AlertTriangle className="h-4 w-4 text-[color:var(--risk-high)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.reason}</p>
                </div>
                <span className="text-xs font-medium" style={{ color: a.risk === "High" ? "var(--risk-high)" : "var(--risk-medium)" }}>{a.risk}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="font-display font-semibold mb-3">This week</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-muted-foreground">New creators discovered</span><span className="font-medium">128</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Briefs generated</span><span className="font-medium">14</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Outreach emails sent</span><span className="font-medium">92</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Avg authenticity</span><span className="font-medium text-[color:var(--risk-safe)]">{formatPercent(84.6)}</span></li>
          </ul>
        </GlassCard>
      </div>
    </>
  );
}