import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { adminUsers } from "@/lib/mock/users";

export const Route = createFileRoute("/app/admin/users")({
  head: () => ({ meta: [{ title: "Users — Admin" }] }),
  component: UsersPage,
});

const statusColor: Record<string, string> = { Active: "var(--risk-safe)", Invited: "var(--primary)", Suspended: "var(--risk-high)" };

function UsersPage() {
  return (
    <>
      <PageHeader title="User management" description="Manage workspace accounts and roles." />
      <GlassCard className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUsers.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8"><AvatarImage src={u.avatar} /><AvatarFallback>{u.name.slice(0,2)}</AvatarFallback></Avatar>
                    <div><p className="text-sm font-medium">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
                  </div>
                </TableCell>
                <TableCell><span className="text-xs px-2 py-1 rounded-full glass">{u.role}</span></TableCell>
                <TableCell><span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: `color-mix(in oklab, ${statusColor[u.status]} 18%, transparent)`, color: statusColor[u.status] }}>{u.status}</span></TableCell>
                <TableCell className="text-muted-foreground text-sm">{u.joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </>
  );
}