import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { campaigns } from "@/lib/mock/campaigns";
import { formatCurrency, formatNumber } from "@/lib/format";

export const Route = createFileRoute("/app/admin/campaigns")({
  head: () => ({ meta: [{ title: "Campaign monitor — Admin" }] }),
  component: AdminCampaigns,
});

const statusColor: Record<string, string> = { Active: "var(--risk-safe)", Completed: "var(--primary)", Draft: "var(--muted-foreground)", Paused: "var(--risk-medium)" };

function AdminCampaigns() {
  return (
    <>
      <PageHeader title="Campaign monitor" description="Cross-workspace campaign performance." />
      <GlassCard className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Campaign</TableHead><TableHead>Brand</TableHead><TableHead>Status</TableHead><TableHead>Budget</TableHead><TableHead>ROI</TableHead><TableHead>Reach</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((c) => (
              <TableRow key={c.id}>
                <TableCell><Link to="/app/campaigns/$id" params={{ id: c.id }} className="text-sm font-medium hover:underline">{c.name}</Link></TableCell>
                <TableCell className="text-sm text-muted-foreground">{c.brand}</TableCell>
                <TableCell><span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: `color-mix(in oklab, ${statusColor[c.status]} 18%, transparent)`, color: statusColor[c.status] }}>{c.status}</span></TableCell>
                <TableCell className="text-sm">{formatCurrency(c.budget)}</TableCell>
                <TableCell><span className="font-display gradient-text font-semibold">{c.roi}%</span></TableCell>
                <TableCell className="text-sm">{formatNumber(c.reach)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </>
  );
}