import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RiskBadge } from "@/components/ui-ext/risk-badge";
import { influencers } from "@/lib/mock/influencers";
import { formatNumber, formatPercent } from "@/lib/format";

export const Route = createFileRoute("/app/admin/influencers")({
  head: () => ({ meta: [{ title: "Influencers — Admin" }] }),
  component: AdminInfluencersPage,
});

function AdminInfluencersPage() {
  return (
    <>
      <PageHeader title="Influencer management" description={`${influencers.length} creators indexed in your workspace.`} />
      <GlassCard className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Creator</TableHead><TableHead>Platform</TableHead><TableHead>Followers</TableHead>
              <TableHead>Engagement</TableHead><TableHead>Authenticity</TableHead><TableHead>Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {influencers.slice(0, 20).map((i) => (
              <TableRow key={i.id}>
                <TableCell>
                  <Link to="/app/influencer/$id" params={{ id: i.id }} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8"><AvatarImage src={i.avatar} /><AvatarFallback>{i.name.slice(0,2)}</AvatarFallback></Avatar>
                    <div><p className="text-sm font-medium">{i.name}</p><p className="text-xs text-muted-foreground">@{i.username}</p></div>
                  </Link>
                </TableCell>
                <TableCell className="text-sm">{i.platform}</TableCell>
                <TableCell className="text-sm">{formatNumber(i.followers)}</TableCell>
                <TableCell className="text-sm">{formatPercent(i.engagementRate)}</TableCell>
                <TableCell><span className="font-medium" style={{ color: i.authenticityScore >= 80 ? "var(--risk-safe)" : i.authenticityScore >= 60 ? "var(--risk-medium)" : "var(--risk-high)" }}>{i.authenticityScore}</span></TableCell>
                <TableCell><RiskBadge risk={i.fraudRisk} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </>
  );
}