import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { fraudReports } from "@/lib/mock/users";

export const Route = createFileRoute("/app/admin/fraud-reports")({
  head: () => ({ meta: [{ title: "Fraud Reports — Admin" }] }),
  component: FraudReportsPage,
});

const sevColor: Record<string, string> = { High: "var(--risk-high)", Medium: "var(--risk-medium)", Low: "var(--risk-safe)" };
const statColor: Record<string, string> = { Open: "var(--risk-high)", Investigating: "var(--risk-medium)", Resolved: "var(--risk-safe)" };

function FraudReportsPage() {
  return (
    <>
      <PageHeader title="Fraud reports" description="Open and investigated fraud cases." />
      <GlassCard className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Creator</TableHead><TableHead>Reason</TableHead><TableHead>Severity</TableHead><TableHead>Status</TableHead><TableHead>Reported</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {fraudReports.map((r) => (
              <TableRow key={r.id}>
                <TableCell><p className="text-sm font-medium">{r.influencer}</p><p className="text-xs text-muted-foreground">@{r.username} · {r.platform}</p></TableCell>
                <TableCell className="text-sm max-w-xs">{r.reason}</TableCell>
                <TableCell><span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: `color-mix(in oklab, ${sevColor[r.severity]} 18%, transparent)`, color: sevColor[r.severity] }}>{r.severity}</span></TableCell>
                <TableCell><span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: `color-mix(in oklab, ${statColor[r.status]} 18%, transparent)`, color: statColor[r.status] }}>{r.status}</span></TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.reported}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </>
  );
}