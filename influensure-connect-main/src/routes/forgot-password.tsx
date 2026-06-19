import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientButton } from "@/components/ui-ext/gradient-button";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Influensure" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={<><Link to="/login" className="text-primary font-medium">Back to sign in</Link></>}
    >
      <div className="space-y-4">
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="you@brand.co" /></div>
        <GradientButton className="w-full">Send reset link</GradientButton>
      </div>
    </AuthShell>
  );
}