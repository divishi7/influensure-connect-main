import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { ChartCard } from "@/components/ui-ext/chart-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RiskBadge } from "@/components/ui-ext/risk-badge";
import { ScoreMeter } from "@/components/ui-ext/score-meter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { getInfluencer } from "@/lib/mock/influencers";
import { formatNumber, formatPercent } from "@/lib/format";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { ArrowLeft, MessageCircle, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/app/influencer/$id")({
  head: () => ({ meta: [{ title: "Influencer profile — Influensure" }] }),
  component: ProfilePage,
  notFoundComponent: () => <div className="p-8">Influencer not found.</div>,
});

function ProfilePage() {
  const { id } = useParams({ from: "/app/influencer/$id" });
  const inf = getInfluencer(id);
  if (!inf) return <div>Not found</div>;

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="mb-3 -ml-2"><Link to="/app/discover"><ArrowLeft className="h-4 w-4 mr-1" /> Back to discovery</Link></Button>
      <GlassCard className="p-6 mb-6 hero-bg">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <Avatar className="h-24 w-24 ring-4 ring-background shadow-glow">
            <AvatarImage src={inf.avatar} />
            <AvatarFallback>{inf.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-display text-2xl font-semibold">{inf.name}</h1>
              <RiskBadge risk={inf.fraudRisk} />
            </div>
            <p className="text-sm text-muted-foreground">@{inf.username} · {inf.platform} · {inf.niche} · {inf.location}</p>
            <p className="text-sm mt-2 max-w-2xl">{inf.bio}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <Metric label="Followers" value={formatNumber(inf.followers)} />
              <Metric label="Following" value={formatNumber(inf.following)} />
              <Metric label="Posts" value={formatNumber(inf.posts)} />
              <Metric label="Engagement" value={formatPercent(inf.engagementRate)} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ScoreMeter score={inf.authenticityScore} label="Authenticity" size="lg" />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1"><MessageCircle className="h-4 w-4" /> Message</Button>
              <GradientButton size="sm">Add to campaign</GradientButton>
            </div>
          </div>
        </div>
      </GlassCard>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <ChartCard title="Follower growth" description="Last 12 months">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={inf.growth}>
                  <defs><linearGradient id="g1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatNumber(v as number)} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v) => formatNumber(v as number)} />
                  <Area type="monotone" dataKey="followers" stroke="var(--primary)" strokeWidth={2} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Engagement trend" description="Monthly engagement rate %">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inf.engagement}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v) => `${(v as number).toFixed(2)}%`} />
                  <Line type="monotone" dataKey="rate" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--accent)" }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4 mt-4">
          <div className="grid lg:grid-cols-3 gap-4">
            <ChartCard title="Gender split">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{ name: "Female", value: inf.audience.genderFemale }, { name: "Male", value: inf.audience.genderMale }]} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                    <Cell fill="var(--accent)" />
                    <Cell fill="var(--primary)" />
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v) => `${v}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Age groups">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inf.audience.ageGroups}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v) => `${v}%`} />
                  <Bar dataKey="value" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <GlassCard className="p-5">
              <h3 className="font-display font-semibold mb-3">Top countries</h3>
              <ul className="space-y-3">
                {inf.audience.topCountries.map((c) => (
                  <li key={c.country} className="space-y-1">
                    <div className="flex justify-between text-sm"><span>{c.country}</span><span className="text-muted-foreground">{c.value}%</span></div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full gradient-bg" style={{ width: `${c.value}%` }} /></div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="fraud" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FraudStat label="Fake followers" value={`${inf.fraud.fakeFollowers}%`} risk={inf.fraud.fakeFollowers > 25 ? "high" : inf.fraud.fakeFollowers > 12 ? "medium" : "safe"} />
            <FraudStat label="Bot comments" value={`${inf.fraud.botComments}%`} risk={inf.fraud.botComments > 30 ? "high" : inf.fraud.botComments > 15 ? "medium" : "safe"} />
            <FraudStat label="Audience quality" value={`${inf.fraud.audienceQuality}/100`} risk={inf.fraud.audienceQuality > 80 ? "safe" : inf.fraud.audienceQuality > 60 ? "medium" : "high"} />
            <FraudStat label="Engagement consistency" value={`${inf.fraud.engagementConsistency}/100`} risk={inf.fraud.engagementConsistency > 80 ? "safe" : inf.fraud.engagementConsistency > 60 ? "medium" : "high"} />
          </div>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-3"><ShieldAlert className="h-5 w-5 text-primary" /><h3 className="font-display font-semibold">Analysis summary</h3></div>
            <p className="text-sm text-muted-foreground">
              Based on a 90-day audit, this creator's engagement signals are <strong style={{ color: inf.authenticityScore >= 80 ? "var(--risk-safe)" : inf.authenticityScore >= 60 ? "var(--risk-medium)" : "var(--risk-high)" }}>{inf.fraudRisk === "safe" ? "consistent and authentic" : inf.fraudRisk === "medium" ? "showing some inconsistency" : "highly inconsistent with organic patterns"}</strong>.
              Detected {inf.fraud.suspiciousSpikes} suspicious follower spike(s), with an audience quality score of {inf.fraud.audienceQuality}/100.
            </p>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="font-display text-base font-semibold">{value}</p>
    </div>
  );
}

function FraudStat({ label, value, risk }: { label: string; value: string; risk: "safe" | "medium" | "high" }) {
  const color = risk === "safe" ? "var(--risk-safe)" : risk === "medium" ? "var(--risk-medium)" : "var(--risk-high)";
  return (
    <GlassCard className="p-5">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="font-display text-2xl font-semibold mt-1" style={{ color }}>{value}</p>
    </GlassCard>
  );
}