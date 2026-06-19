import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { Button } from "@/components/ui/button";
import { generateBrief, type CampaignBriefInput } from "@/lib/mock/generators";
import { nicheOptions } from "@/lib/mock/influencers";
import { InfluencerCard } from "@/components/influencer/influencer-card";
import { Copy, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/campaigns/new")({
  head: () => ({ meta: [{ title: "New campaign — Influensure" }] }),
  component: NewCampaign,
});

function NewCampaign() {
  const [form, setForm] = useState<CampaignBriefInput>({
    campaignName: "", productCategory: "Beauty", budget: 25000, audience: "Women 18–34, urban, beauty-curious",
    timeline: "8 weeks", goals: "Drive 5K conversions and 1M authentic reach",
  });
  const [niche, setNiche] = useState<string>("Beauty");
  const [brief, setBrief] = useState<ReturnType<typeof generateBrief> | null>(null);

  const upd = <K extends keyof CampaignBriefInput>(k: K, v: CampaignBriefInput[K]) => setForm({ ...form, [k]: v });

  const onGenerate = () => {
    if (!form.campaignName) { toast.error("Give your campaign a name"); return; }
    setBrief(generateBrief({ ...form, niche: niche as any }));
    toast.success("Campaign brief generated");
  };

  const copyEmail = () => {
    if (!brief) return;
    navigator.clipboard?.writeText(brief.outreachEmail);
    toast.success("Outreach email copied");
  };

  return (
    <>
      <PageHeader title="Generate a campaign brief" description="Fill in the basics. We'll generate the brief, deliverables, suggested creators, and outreach email." />
      <div className="grid lg:grid-cols-5 gap-4">
        <GlassCard className="p-5 lg:col-span-2 space-y-4 h-fit">
          <Field label="Campaign name"><Input value={form.campaignName} onChange={(e) => upd("campaignName", e.target.value)} placeholder="Summer Glow Launch" /></Field>
          <Field label="Product category"><Input value={form.productCategory} onChange={(e) => upd("productCategory", e.target.value)} placeholder="Beauty / Tech / Fitness…" /></Field>
          <Field label="Niche">
            <Select value={niche} onValueChange={setNiche}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{nicheOptions.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Budget (INR)"><Input type="number" value={form.budget} onChange={(e) => upd("budget", Number(e.target.value))} /></Field>
          <Field label="Target audience"><Textarea value={form.audience} onChange={(e) => upd("audience", e.target.value)} rows={2} /></Field>
          <Field label="Timeline"><Input value={form.timeline} onChange={(e) => upd("timeline", e.target.value)} placeholder="8 weeks" /></Field>
          <Field label="Goals"><Textarea value={form.goals} onChange={(e) => upd("goals", e.target.value)} rows={2} /></Field>
          <GradientButton onClick={onGenerate} className="w-full"><Sparkles className="h-4 w-4 mr-1" /> Generate brief</GradientButton>
        </GlassCard>

        <div className="lg:col-span-3 space-y-4">
          {!brief ? (
            <GlassCard className="p-10 text-center">
              <Sparkles className="h-8 w-8 mx-auto mb-3 text-primary" />
              <p className="text-muted-foreground">Fill in the form to generate your campaign brief.</p>
            </GlassCard>
          ) : (
            <>
              <GlassCard className="p-6">
                <h3 className="font-display text-lg font-semibold mb-2">Overview</h3>
                <p className="text-sm text-muted-foreground">{brief.overview}</p>
              </GlassCard>
              <div className="grid md:grid-cols-2 gap-4">
                <GlassCard className="p-5">
                  <h3 className="font-display font-semibold mb-3">Objectives</h3>
                  <ul className="space-y-2 text-sm">
                    {brief.objectives.map((o) => <li key={o} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[color:var(--risk-safe)] shrink-0 mt-0.5" />{o}</li>)}
                  </ul>
                </GlassCard>
                <GlassCard className="p-5">
                  <h3 className="font-display font-semibold mb-3">Deliverables</h3>
                  <ul className="space-y-2 text-sm">
                    {brief.deliverables.map((d) => <li key={d} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{d}</li>)}
                  </ul>
                </GlassCard>
              </div>
              <GlassCard className="p-5">
                <h3 className="font-display font-semibold mb-3">KPIs</h3>
                <div className="flex flex-wrap gap-2">
                  {brief.kpis.map((k) => <span key={k} className="text-xs px-3 py-1.5 rounded-full glass">{k}</span>)}
                </div>
              </GlassCard>
              <GlassCard className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold">Outreach email</h3>
                  <Button variant="outline" size="sm" onClick={copyEmail}><Copy className="h-4 w-4 mr-1" /> Copy</Button>
                </div>
                <pre className="text-xs whitespace-pre-wrap font-mono bg-muted/30 rounded-lg p-4">{brief.outreachEmail}</pre>
              </GlassCard>
              <div>
                <h3 className="font-display text-lg font-semibold mb-3">Suggested creators</h3>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {brief.suggestedInfluencers.map((i) => <InfluencerCard key={i.id} inf={i} />)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-xs">{label}</Label>{children}</div>;
}