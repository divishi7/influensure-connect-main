import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, GoogleButton } from "@/components/auth/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Influensure" }, { name: "description", content: "Sign in to your Influensure account." }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue to your dashboard."
      footer={<>Don't have an account? <Link to="/signup" className="text-primary font-medium">Sign up</Link></>}
    >
      <div className="space-y-4">
        <GoogleButton />
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@brand.co" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary">Forgot password?</Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <GradientButton className="w-full" asChild><Link to="/app">Sign in</Link></GradientButton>
      </div>
    </AuthShell>
  );
}