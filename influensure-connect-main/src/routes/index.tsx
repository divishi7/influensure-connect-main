import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, ShieldCheck, Sparkles, Search as SearchIcon, BarChart3, AlertTriangle, Bot, Clock, DollarSign, Users, TrendingUp, Zap, CheckCircle2 } from "lucide-react";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { SectionHeading } from "@/components/ui-ext/section-heading";
import { StatCard } from "@/components/ui-ext/stat-card";
import { ScoreMeter } from "@/components/ui-ext/score-meter";
import { RiskBadge } from "@/components/ui-ext/risk-badge";
import { LineChart, Line, ResponsiveContainer, Area, AreaChart, XAxis, Tooltip } from "recharts";
import { engagementTrend } from "@/lib/mock/analytics";
import { influencers } from "@/lib/mock/influencers";
import { formatNumber, formatPercent } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Influensure — Find Real Influencers. Drive Real Results." },
      { name: "description", content: "AI-powered influencer discovery and fraud detection platform helping brands eliminate fake engagement and maximize campaign ROI." },
      { property: "og:title", content: "Influensure — AI Influencer Discovery & Fraud Detection" },
      { property: "og:description", content: "Connecting brands with the perfect creators, effortlessly." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = influencers.slice(0, 2);
  return (
    <div className="min-h-screen">
      <MarketingNav />
      {/* Hero */}
      <section className="relative overflow-hidden hero-bg">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
          <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Connecting brands with the perfect creators, effortlessly
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight leading-[1.05]">
              Find <span className="gradient-text">Real Influencers.</span>
              <br /> Drive Real Results.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              AI-powered influencer discovery and fraud detection platform helping brands eliminate fake engagement and maximize campaign ROI.
            </p>
            <div className="flex flex-wrap gap-3">
              <GradientButton size="lg" asChild>
                <Link to="/signup">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </GradientButton>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-4 w-4" /> Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[color:var(--risk-safe)]" /> No credit card</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[color:var(--risk-safe)]" /> 14-day free trial</div>
            </div>
          </div>

          {/* Hero dashboard mock */}
          <div className="relative">
            <div className="absolute -top-8 -right-8 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <GlassCard className="p-5 shadow-glow animate-float">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Live campaign</p>
                  <p className="font-display font-semibold">Summer Glow Launch</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs rounded-full bg-[color-mix(in_oklab,var(--risk-safe)_18%,transparent)] text-[color:var(--risk-safe)] px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--risk-safe)]" /> Active
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] uppercase text-muted-foreground">Reach</p>
                  <p className="font-display text-lg font-semibold">1.2M</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] uppercase text-muted-foreground">Engagement</p>
                  <p className="font-display text-lg font-semibold">4.8%</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] uppercase text-muted-foreground">ROI</p>
                  <p className="font-display text-lg font-semibold gradient-text">240%</p>
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementTrend}>
                    <defs>
                      <linearGradient id="hero-grad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="engagement" stroke="var(--primary)" strokeWidth={2} fill="url(#hero-grad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard className="absolute -bottom-6 -left-6 p-4 w-64 shadow-glow animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-3">
                <img src={featured[0].avatar} alt="" className="h-10 w-10 rounded-full ring-2 ring-border" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{featured[0].name}</p>
                  <p className="text-[11px] text-muted-foreground">@{featured[0].username}</p>
                </div>
                <ScoreMeter score={featured[0].authenticityScore} size="sm" />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{formatNumber(featured[0].followers)} followers</span>
                <RiskBadge risk={featured[0].fraudRisk} />
              </div>
            </GlassCard>

            <GlassCard className="absolute -top-6 -right-2 p-3 w-52 shadow-glow animate-float" style={{ animationDelay: "0.8s" }}>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="h-4 w-4 text-[color:var(--risk-safe)]" />
                <p className="text-xs font-medium">Audience verified</p>
              </div>
              <p className="text-[11px] text-muted-foreground">92% real followers · 0 bot patterns</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Trusted by modern brands</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-muted-foreground/70 font-display font-semibold text-lg">
            {["Aurora", "FitFlex", "Strider", "EcoBean", "Nova Audio", "Wanderlust"].map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The problem"
            title="Influencer marketing is broken."
            description="Brands lose millions to fake engagement, bot followers, and unverified creators every year."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            <ProblemCard icon={DollarSign} value="Rs. 400K+" label="Annual brand losses" hint="per mid-sized brand to fake engagement" accent="high" />
            <ProblemCard icon={Bot} value="50%" label="Influencers with fake engagement" hint="across major platforms" accent="medium" />
            <ProblemCard icon={Clock} value="20+ hrs" label="Manual research per campaign" hint="spent vetting & verifying creators" accent="medium" />
            <ProblemCard icon={AlertTriangle} value="0" label="Pre-campaign fraud verification" hint="exists in most existing tools" accent="high" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Built for modern brands"
            title="Everything you need, in one platform."
            description="From discovery to fraud detection to campaign analytics — Influensure is your end-to-end creator marketing OS."
          />
          <div className="grid md:grid-cols-2 gap-5 mt-12">
            <FeatureCard
              icon={SearchIcon}
              title="Smart Discovery"
              description="Search influencers by niche, followers, engagement rate, and location. Filters powered by verified audience data."
              accent="primary"
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Fraud Detection"
              description="Detect fake followers, bots, and suspicious engagement patterns before you spend a single dollar."
              accent="accent"
            />
            <FeatureCard
              icon={Sparkles}
              title="Campaign Generator"
              description="Generate campaign briefs, deliverables, and outreach emails in seconds — tailored to your goals & audience."
              accent="primary"
            />
            <FeatureCard
              icon={BarChart3}
              title="Analytics Dashboard"
              description="Track ROI, reach, engagement, and conversions across all your campaigns in one beautiful place."
              accent="accent"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="How it works" title="Launch a verified campaign in 3 steps." />
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {[
              { n: "01", icon: SearchIcon, t: "Discover", d: "Search 12K+ vetted creators using AI-powered filters across niche, audience & geo." },
              { n: "02", icon: ShieldCheck, t: "Verify", d: "See authenticity scores, fraud risk, audience quality, and engagement consistency for every creator." },
              { n: "03", icon: TrendingUp, t: "Launch & Measure", d: "Generate briefs, send outreach, and track ROI in real-time with our analytics dashboard." },
            ].map((s) => (
              <GlassCard key={s.n} className="p-6 relative">
                <span className="font-display text-5xl gradient-text font-semibold">{s.n}</span>
                <s.icon className="absolute top-6 right-6 h-5 w-5 text-muted-foreground" />
                <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <GlassCard className="relative overflow-hidden p-10 md:p-14 text-center hero-bg">
            <h2 className="text-3xl md:text-4xl font-display font-semibold">Ready to launch authentic campaigns?</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Join hundreds of modern brands using Influensure to eliminate fake engagement and 3x their creator ROI.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <GradientButton size="lg" asChild>
                <Link to="/signup">Start free trial <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </GradientButton>
              <Button size="lg" variant="outline" asChild>
                <Link to="/app">Explore dashboard</Link>
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function ProblemCard({ icon: Icon, value, label, hint, accent }: { icon: any; value: string; label: string; hint: string; accent: "high" | "medium" }) {
  const color = accent === "high" ? "var(--risk-high)" : "var(--risk-medium)";
  return (
    <GlassCard className="p-6 hover:-translate-y-0.5">
      <div className="rounded-xl p-2.5 inline-flex" style={{ background: `color-mix(in oklab, ${color} 15%, transparent)`, color }}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-display text-3xl font-semibold" style={{ color }}>{value}</p>
      <p className="text-sm font-medium mt-1">{label}</p>
      <p className="text-xs text-muted-foreground mt-1">{hint}</p>
    </GlassCard>
  );
}

function FeatureCard({ icon: Icon, title, description, accent }: { icon: any; title: string; description: string; accent: "primary" | "accent" }) {
  return (
    <GlassCard className="p-6 group hover:-translate-y-0.5 hover:shadow-glow">
      <div className={`inline-flex rounded-xl p-3 gradient-bg text-primary-foreground shadow-glow`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </GlassCard>
  );
}
