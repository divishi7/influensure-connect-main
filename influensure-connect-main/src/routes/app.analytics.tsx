import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { StatCard } from "@/components/ui-ext/stat-card";
import { ChartCard } from "@/components/ui-ext/chart-card";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Users, MousePointerClick, TrendingUp, Activity, DollarSign, Target, Download } from "lucide-react";
import { analyticsKPIs, engagementTrend, campaignPerformance, audienceGrowth, platformReach } from "@/lib/mock/analytics";
import { campaigns } from "@/lib/mock/campaigns";
import { formatCurrency, formatNumber } from "@/lib/format";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Influensure" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const exportCsv = () => {
    const rows = ["name,roi,reach,conversions,revenue", ...campaigns.map((c) => `${c.name},${c.roi},${c.reach},${c.conversions},${c.revenue}`)].join("\n");
    const blob = new Blob([rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "influensure-campaigns.csv";
    a.click();
    toast.success("CSV exported");
  };

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Performance across all your campaigns."
        actions={
          <>
            <Select defaultValue="30">
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-1" /> Export</Button>
          </>
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard label="Reach" value={formatNumber(analyticsKPIs.reach)} icon={Eye} trend={12.4} />
        <StatCard label="Impressions" value={formatNumber(analyticsKPIs.impressions)} icon={Activity} trend={9.1} />
        <StatCard label="Engagement" value={formatNumber(analyticsKPIs.engagement)} icon={Users} trend={14.8} accent="accent" />
        <StatCard label="Clicks" value={formatNumber(analyticsKPIs.clicks)} icon={MousePointerClick} trend={6.2} />
        <StatCard label="Conversions" value={formatNumber(analyticsKPIs.conversions)} icon={Target} trend={18.4} accent="safe" />
        <StatCard label="Revenue" value={formatCurrency(analyticsKPIs.revenue)} icon={DollarSign} trend={22.6} accent="safe" />
        <StatCard label="ROI" value={`${analyticsKPIs.roi}%`} icon={TrendingUp} trend={11.3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <ChartCard title="Reach & engagement" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementTrend}>
              <defs>
                <linearGradient id="a1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
                <linearGradient id="a2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35}/><stop offset="100%" stopColor="var(--accent)" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatNumber(v as number)} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v) => formatNumber(v as number)} />
              <Area type="monotone" dataKey="reach" stroke="var(--accent)" fill="url(#a2)" strokeWidth={2} />
              <Area type="monotone" dataKey="engagement" stroke="var(--primary)" fill="url(#a1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Platform reach">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={platformReach} dataKey="value" nameKey="platform" innerRadius={50} outerRadius={90} paddingAngle={3}>
                {platformReach.map((_, i) => <Cell key={i} fill={`var(--chart-${(i % 5) + 1})`} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v) => formatNumber(v as number)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <ChartCard title="Campaign ROI">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignPerformance}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="roi" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Audience growth">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={audienceGrowth}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatNumber(v as number)} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v) => formatNumber(v as number)} />
              <Line type="monotone" dataKey="audience" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6">
        <h3 className="font-display text-lg font-semibold mb-3">Campaign comparison</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.slice(0, 6).map((c) => (
            <GlassCard key={c.id} className="p-5">
              <p className="text-xs text-muted-foreground">{c.brand}</p>
              <h4 className="font-display font-semibold">{c.name}</h4>
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div><p className="text-[10px] uppercase text-muted-foreground">ROI</p><p className="font-display gradient-text font-semibold">{c.roi}%</p></div>
                <div><p className="text-[10px] uppercase text-muted-foreground">Revenue</p><p className="font-display font-semibold">{formatCurrency(c.revenue)}</p></div>
                <div><p className="text-[10px] uppercase text-muted-foreground">Conversions</p><p className="font-display font-semibold">{formatNumber(c.conversions)}</p></div>
                <div><p className="text-[10px] uppercase text-muted-foreground">Reach</p><p className="font-display font-semibold">{formatNumber(c.reach)}</p></div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
}