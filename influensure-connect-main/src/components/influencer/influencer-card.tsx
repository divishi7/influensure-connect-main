import { Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RiskBadge } from "@/components/ui-ext/risk-badge";
import { formatNumber, formatPercent } from "@/lib/format";
import type { Influencer } from "@/lib/mock/influencers";
import { Instagram, Youtube, Music2, Twitter } from "lucide-react";

const platformIcon = { Instagram, TikTok: Music2, YouTube: Youtube, X: Twitter } as const;

export function InfluencerCard({ inf }: { inf: Influencer }) {
  const PIcon = platformIcon[inf.platform];
  return (
    <GlassCard className="p-5 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-glow">
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 ring-2 ring-border">
          <AvatarImage src={inf.avatar} alt={inf.name} />
          <AvatarFallback>{inf.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium truncate">{inf.name}</h3>
            <PIcon className="h-4 w-4 text-muted-foreground shrink-0" />
          </div>
          <p className="text-xs text-muted-foreground truncate">@{inf.username} · {inf.niche}</p>
        </div>
        <RiskBadge risk={inf.fraudRisk} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="glass rounded-lg p-2">
          <p className="text-[10px] uppercase text-muted-foreground">Followers</p>
          <p className="font-display text-sm font-semibold">{formatNumber(inf.followers)}</p>
        </div>
        <div className="glass rounded-lg p-2">
          <p className="text-[10px] uppercase text-muted-foreground">Engagement</p>
          <p className="font-display text-sm font-semibold">{formatPercent(inf.engagementRate)}</p>
        </div>
        <div className="glass rounded-lg p-2">
          <p className="text-[10px] uppercase text-muted-foreground">Authenticity</p>
          <p
            className="font-display text-sm font-semibold"
            style={{ color: inf.authenticityScore >= 80 ? "var(--risk-safe)" : inf.authenticityScore >= 60 ? "var(--risk-medium)" : "var(--risk-high)" }}
          >
            {inf.authenticityScore}
          </p>
        </div>
      </div>
      <Button asChild variant="outline" className="w-full">
        <Link to="/app/influencer/$id" params={{ id: inf.id }}>View Profile</Link>
      </Button>
    </GlassCard>
  );
}

export { platformIcon };