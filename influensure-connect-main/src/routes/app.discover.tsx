import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { influencers, nicheOptions, platformOptions, locationOptions } from "@/lib/mock/influencers";
import { InfluencerCard } from "@/components/influencer/influencer-card";
import { formatNumber } from "@/lib/format";

export const Route = createFileRoute("/app/discover")({
  head: () => ({ meta: [{ title: "Discover Influencers — Influensure" }] }),
  component: DiscoverPage,
});

function DiscoverPage() {
  const [q, setQ] = useState("");
  const [niche, setNiche] = useState<string>("all");
  const [platform, setPlatform] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [followers, setFollowers] = useState<[number, number]>([0, 5_000_000]);
  const [engagement, setEngagement] = useState<number>(0);
  const [authenticity, setAuthenticity] = useState<number>(0);
  const [gender, setGender] = useState<string>("any");
  const [sort, setSort] = useState<string>("authenticity");

  const filtered = useMemo(() => {
    return influencers
      .filter((i) =>
        (!q || `${i.name} ${i.username} ${i.niche}`.toLowerCase().includes(q.toLowerCase())) &&
        (niche === "all" || i.niche === niche) &&
        (platform === "all" || i.platform === platform) &&
        (location === "all" || i.location === location) &&
        i.followers >= followers[0] && i.followers <= followers[1] &&
        i.engagementRate >= engagement &&
        i.authenticityScore >= authenticity &&
        (gender === "any" || (gender === "female" ? i.audience.genderFemale >= 55 : i.audience.genderMale >= 55))
      )
      .sort((a, b) => {
        if (sort === "followers") return b.followers - a.followers;
        if (sort === "engagement") return b.engagementRate - a.engagementRate;
        return b.authenticityScore - a.authenticityScore;
      });
  }, [q, niche, platform, location, followers, engagement, authenticity, gender, sort]);

  const reset = () => {
    setQ(""); setNiche("all"); setPlatform("all"); setLocation("all");
    setFollowers([0, 5_000_000]); setEngagement(0); setAuthenticity(0); setGender("any");
  };

  return (
    <>
      <PageHeader
        title="Discover influencers"
        description={`${filtered.length} creators matching your filters`}
        actions={<Button variant="outline" onClick={reset} className="gap-1"><X className="h-4 w-4" /> Clear filters</Button>}
      />
      <GlassCard className="p-4 md:p-5 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search creators by name, niche, or username…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9 h-11" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SelectField label="Niche" value={niche} onChange={setNiche} options={[{ value: "all", label: "All niches" }, ...nicheOptions.map((n) => ({ value: n, label: n }))]} />
          <SelectField label="Platform" value={platform} onChange={setPlatform} options={[{ value: "all", label: "All platforms" }, ...platformOptions.map((p) => ({ value: p, label: p }))]} />
          <SelectField label="Location" value={location} onChange={setLocation} options={[{ value: "all", label: "All locations" }, ...locationOptions.map((l) => ({ value: l, label: l }))]} />
          <SelectField label="Audience gender" value={gender} onChange={setGender} options={[{ value: "any", label: "Any" }, { value: "female", label: "Primarily female" }, { value: "male", label: "Primarily male" }]} />
          <RangeField label="Followers" value={followers} min={0} max={5_000_000} step={50_000} onChange={(v) => setFollowers(v as [number, number])} format={formatNumber} />
          <SingleSlider label="Min engagement" value={engagement} min={0} max={10} step={0.5} onChange={setEngagement} suffix="%" />
          <SingleSlider label="Min authenticity" value={authenticity} min={0} max={100} step={5} onChange={setAuthenticity} suffix="/100" />
          <SelectField label="Sort by" value={sort} onChange={setSort} options={[{ value: "authenticity", label: "Authenticity" }, { value: "followers", label: "Followers" }, { value: "engagement", label: "Engagement" }]} />
        </div>
      </GlassCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((i) => <InfluencerCard key={i.id} inf={i} />)}
      </div>
      {filtered.length === 0 && (
        <GlassCard className="p-12 text-center text-muted-foreground">No creators match your filters. Try clearing some.</GlassCard>
      )}
    </>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

function RangeField({ label, value, min, max, step, onChange, format }: { label: string; value: number[]; min: number; max: number; step: number; onChange: (v: number[]) => void; format: (n: number) => string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <Label className="text-xs">{label}</Label>
        <span className="text-xs text-muted-foreground">{format(value[0])} – {format(value[1])}</span>
      </div>
      <Slider value={value} min={min} max={max} step={step} onValueChange={onChange} />
    </div>
  );
}

function SingleSlider({ label, value, min, max, step, onChange, suffix }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; suffix?: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <Label className="text-xs">{label}</Label>
        <span className="text-xs text-muted-foreground">{value}{suffix}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} />
    </div>
  );
}