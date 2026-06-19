import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { SectionHeading } from "@/components/ui-ext/section-heading";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Influensure" },
      { name: "description", content: "Transparent, scalable pricing for brands of every size." },
      { property: "og:title", content: "Pricing — Influensure" },
      { property: "og:description", content: "Plans for startups, growth brands, and enterprises." },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  { name: "Starter", price: "$49", period: "/ mo", desc: "For small brands testing the waters.", features: ["500 creator searches / mo", "Basic fraud detection", "2 active campaigns", "Email support"], highlight: false },
  { name: "Growth", price: "$199", period: "/ mo", desc: "For growing brands running real campaigns.", features: ["Unlimited creator searches", "Full fraud detection suite", "Unlimited campaigns", "Brief generator + outreach", "Priority support"], highlight: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "For agencies & global brands.", features: ["Everything in Growth", "Dedicated success manager", "SAML SSO + audit logs", "Custom integrations", "SLA-backed support"], highlight: false },
];

function PricingPage() {
  return (
    <div className="min-h-screen">
      <MarketingNav />
      <section className="hero-bg py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Pricing" title="Simple, transparent pricing." description="Start free. Scale as you grow. Cancel anytime." />
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <GlassCard key={t.name} className={`p-7 relative ${t.highlight ? "shadow-glow ring-1 ring-primary/40" : ""}`}>
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg text-primary-foreground text-xs font-medium rounded-full px-3 py-1">Most popular</span>
              )}
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              <p className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-[color:var(--risk-safe)] shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
              {t.highlight ? (
                <GradientButton className="w-full mt-6" asChild><Link to="/signup">Start trial</Link></GradientButton>
              ) : (
                <Button className="w-full mt-6" variant="outline" asChild><Link to="/signup">Get started</Link></Button>
              )}
            </GlassCard>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}