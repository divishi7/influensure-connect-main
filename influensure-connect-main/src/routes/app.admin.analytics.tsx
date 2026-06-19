import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { StatCard } from "@/components/ui-ext/stat-card";
import { ChartCard } from "@/components/ui-ext/chart-card";
import { engagementTrend, audienceGrowth, platformReach } from "@/lib/mock/analytics";
import { Users, Activity, Globe, ShieldCheck } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { formatNumber } from "@/lib/format";

export const Route = createFileRoute("/app/admin/analytics")({
  head: () => ({ meta: [{ title: "Platform analytics — Admin" }] }),
  component: PlatformAnalytics,
});

function PlatformAnalytics() {
  return (
    <>
      <PageHeader title="Platform analytics" description="Influensure-wide usage & health." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active brands" value="248" icon={Users} trend={9.2} />
        <StatCard label="Creators indexed" value="12,482" icon={Globe} trend={6.4} accent="accent" />
        <StatCard label="Verified" value="8,146" icon={ShieldCheck} trend={11.6} accent="safe" />
        <StatCard label="API uptime" value="99.98%" icon={Activity} trend={0.1} accent="safe" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <ChartCard title="Platform activity" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementTrend}>
              <defs><linearGradient id="pa" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatNumber(v as number)} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="reach" stroke="var(--primary)" strokeWidth={2} fill="url(#pa)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Platform mix">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={platformReach} dataKey="value" nameKey="platform" innerRadius={50} outerRadius={90} paddingAngle={3}>
                {platformReach.map((_, i) => <Cell key={i} fill={`var(--chart-${(i % 5) + 1})`} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <ChartCard title="Audience growth">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={audienceGrowth}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatNumber(v as number)} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v) => formatNumber(v as number)} />
              <Bar dataKey="audience" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Reach trend">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementTrend}>
              <defs><linearGradient id="rt" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--accent)" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatNumber(v as number)} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="engagement" stroke="var(--accent)" strokeWidth={2} fill="url(#rt)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </>
  );
}