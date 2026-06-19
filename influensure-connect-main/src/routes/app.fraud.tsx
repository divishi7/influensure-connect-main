import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { StatCard } from "@/components/ui-ext/stat-card";
import { ChartCard } from "@/components/ui-ext/chart-card";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { ScoreMeter } from "@/components/ui-ext/score-meter";
import { RiskBadge } from "@/components/ui-ext/risk-badge";
import { ShieldAlert, ShieldCheck, AlertTriangle, Activity } from "lucide-react";
import { influencers } from "@/lib/mock/influencers";
import { fraudRiskDistribution } from "@/lib/mock/analytics";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from "recharts";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/fraud")({
  head: () => ({ meta: [{ title: "Fraud Detection — Influensure" }] }),
  component: FraudPage,
});

function FraudPage() {
  const flagged = influencers.filter((i) => i.fraudRisk !== "safe").slice(0, 8);
  const top = influencers.slice(0, 6);
  const consistencyData = influencers.slice(0, 12).map((i) => ({ name: i.username.slice(0, 8), consistency: i.fraud.engagementConsistency }));
  const growthAnomaly = influencers[0].growth.map((g) => ({ month: g.month, organic: g.followers, suspicious: Math.round(g.followers * (1 + (Math.random() - 0.3) * 0.2)) }));

  return (
    <>
      <PageHeader title="Fraud detection" description="Real-time fraud signals across your tracked creators." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Safe creators" value={influencers.filter((i) => i.fraudRisk === "safe").length} icon={ShieldCheck} accent="safe" />
        <StatCard label="Medium risk" value={influencers.filter((i) => i.fraudRisk === "medium").length} icon={AlertTriangle} accent="primary" />
        <StatCard label="High risk" value={influencers.filter((i) => i.fraudRisk === "high").length} icon={ShieldAlert} accent="high" />
        <StatCard label="Avg audience quality" value="84/100" icon={Activity} accent="safe" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <ChartCard title="Risk distribution" description="Across all tracked creators">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={fraudRiskDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                {fraudRiskDistribution.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Engagement consistency" description="Higher = more organic" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={consistencyData}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="consistency" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <ChartCard title="Follower growth anomalies" description="Organic vs suspicious detection">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthAnomaly}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="organic" stroke="var(--primary)" strokeWidth={2} />
              <Line type="monotone" dataKey="suspicious" stroke="var(--risk-high)" strokeWidth={2} strokeDasharray="4 4" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <GlassCard className="p-5">
          <h3 className="font-display font-semibold mb-4">Authenticity scoreboard</h3>
          <div className="grid grid-cols-3 gap-4">
            {top.map((i) => (
              <Link to="/app/influencer/$id" params={{ id: i.id }} key={i.id} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                <ScoreMeter score={i.authenticityScore} size="sm" />
                <p className="text-xs font-medium text-center truncate w-full">@{i.username}</p>
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6">
        <h3 className="font-display font-semibold mb-3">Flagged creators</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {flagged.map((i) => (
            <Link to="/app/influencer/$id" params={{ id: i.id }} key={i.id}>
              <GlassCard className="p-4 hover:-translate-y-0.5 hover:shadow-glow">
                <div className="flex items-center gap-3">
                  <img src={i.avatar} alt="" className="h-10 w-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{i.name}</p>
                    <p className="text-xs text-muted-foreground truncate">@{i.username}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <RiskBadge risk={i.fraudRisk} />
                  <span className="text-xs text-muted-foreground">Score: <strong style={{ color: i.authenticityScore >= 80 ? "var(--risk-safe)" : i.authenticityScore >= 60 ? "var(--risk-medium)" : "var(--risk-high)" }}>{i.authenticityScore}</strong></span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}