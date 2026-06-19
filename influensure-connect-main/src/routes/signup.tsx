import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, GoogleButton } from "@/components/auth/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Influensure" }, { name: "description", content: "Create your Influensure account and start finding real creators." }] }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your 14-day free trial. No credit card required."
      footer={<>Already have an account? <Link to="/login" className="text-primary font-medium">Sign in</Link></>}
    >
      <div className="space-y-4">
        <GoogleButton />
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2"><Label htmlFor="fn">First name</Label><Input id="fn" placeholder="Sara" /></div>
          <div className="space-y-2"><Label htmlFor="ln">Last name</Label><Input id="ln" placeholder="Chen" /></div>
        </div>
        <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" placeholder="Aurora Skincare" /></div>
        <div className="space-y-2"><Label htmlFor="email">Work email</Label><Input id="email" type="email" placeholder="you@brand.co" /></div>
        <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="••••••••" /></div>
        <GradientButton className="w-full" asChild><Link to="/app">Create account</Link></GradientButton>
        <p className="text-xs text-muted-foreground text-center">By signing up, you agree to our Terms & Privacy Policy.</p>
      </div>
    </AuthShell>
  );
}