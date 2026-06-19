import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { SectionHeading } from "@/components/ui-ext/section-heading";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { Search, ShieldCheck, Sparkles, BarChart3, Users, Bot, Globe2, FileText } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Influensure" },
      { name: "description", content: "Smart discovery, fraud detection, campaign briefs, and analytics — every tool a modern brand needs." },
      { property: "og:title", content: "Features — Influensure" },
      { property: "og:description", content: "Discovery, fraud detection, campaign briefs, and analytics in one platform." },
    ],
  }),
  component: FeaturesPage,
});

const items = [
  { icon: Search, title: "Smart Discovery", desc: "12,000+ vetted creators across Instagram, TikTok, YouTube & X. Filter by niche, audience age, gender, location, follower range, engagement rate, and authenticity score." },
  { icon: ShieldCheck, title: "Fraud Detection", desc: "Bot detection, fake follower analysis, suspicious follower spikes, engagement consistency scoring, and audience quality verification." },
  { icon: Sparkles, title: "Campaign Brief Generator", desc: "Generate full campaign briefs, deliverables, KPIs, and personalized outreach emails in seconds." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track reach, impressions, engagement, clicks, conversions, revenue and ROI across all campaigns with beautiful interactive charts." },
  { icon: Users, title: "Audience Insights", desc: "Demographic breakdowns by gender, age, geography, and interest categories — backed by verified audience data." },
  { icon: Bot, title: "AI Recommendations", desc: "Surface the perfect creators for every campaign based on past performance, audience overlap, and brand fit." },
  { icon: Globe2, title: "Global Coverage", desc: "Creators across 60+ countries with local-language support and region-specific audience quality benchmarks." },
  { icon: FileText, title: "Reports & Exports", desc: "Export branded PDF reports and CSV data for every campaign — share with stakeholders in one click." },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <MarketingNav />
      <section className="hero-bg py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Features" title="Everything you need for authentic creator marketing." description="Built end-to-end for modern brands. From discovery to fraud detection to analytics." />
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid md:grid-cols-2 gap-5">
          {items.map((it) => (
            <GlassCard key={it.title} className="p-6 hover:-translate-y-0.5 hover:shadow-glow">
              <div className="inline-flex rounded-xl p-3 gradient-bg text-primary-foreground shadow-glow">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{it.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{it.desc}</p>
            </GlassCard>
          ))}
        </div>
        <div className="text-center mt-12">
          <GradientButton size="lg" asChild><Link to="/signup">Try it free</Link></GradientButton>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}