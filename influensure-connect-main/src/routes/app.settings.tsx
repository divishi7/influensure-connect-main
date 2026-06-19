import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { useTheme } from "@/lib/theme";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Influensure" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <PageHeader title="Settings" description="Manage your account, brand, and preferences." />
      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="p-6 lg:col-span-2 space-y-5">
          <h3 className="font-display font-semibold">Profile</h3>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16"><AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=sara" /><AvatarFallback>SC</AvatarFallback></Avatar>
            <div><p className="font-medium">Divishi</p><p className="text-xs text-muted-foreground">divishi@vertex.co</p></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>First name</Label><Input defaultValue="Divishi" /></div>
            <div className="space-y-1.5"><Label>Last name</Label><Input defaultValue="Chaudhary" /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="divishi@vertex.co" /></div>
            <div className="space-y-1.5"><Label>Company</Label><Input defaultValue="Vertex" /></div>
          </div>
          <GradientButton onClick={() => toast.success("Settings saved")}>Save changes</GradientButton>
        </GlassCard>
        <GlassCard className="p-6 space-y-5 h-fit">
          <h3 className="font-display font-semibold">Preferences</h3>
          <Row label="Dark mode" hint="Switch between light & dark themes">
            <Switch checked={theme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
          </Row>
          <Row label="Email notifications" hint="Daily campaign + fraud alerts"><Switch defaultChecked /></Row>
          <Row label="Weekly insights" hint="Sunday digest with top creators"><Switch defaultChecked /></Row>
          <Row label="Fraud alerts" hint="Notify when risk score changes"><Switch defaultChecked /></Row>
        </GlassCard>
      </div>
    </>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div><p className="text-sm font-medium">{label}</p>{hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>
      {children}
    </div>
  );
}