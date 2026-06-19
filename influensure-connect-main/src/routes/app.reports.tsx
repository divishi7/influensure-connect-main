import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { campaigns } from "@/lib/mock/campaigns";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — Influensure" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Export branded reports per campaign." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((c) => (
          <GlassCard key={c.id} className="p-5">
            <FileText className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold">{c.name}</h3>
            <p className="text-xs text-muted-foreground">{c.brand} · {c.startDate} → {c.endDate}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => toast.success(`Exporting ${c.name} as PDF`)}><Download className="h-3.5 w-3.5 mr-1" /> PDF</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success(`Exporting ${c.name} as CSV`)}><Download className="h-3.5 w-3.5 mr-1" /> CSV</Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}