import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/ui-ext/logo";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui-ext/gradient-button";
import { ThemeToggle } from "@/components/ui-ext/theme-toggle";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/"><Logo /></Link>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <a href="#problem" className="text-muted-foreground hover:text-foreground transition-colors">Why Influensure</a>
          <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild className="hidden sm:inline-flex"><Link to="/login">Sign in</Link></Button>
          <GradientButton asChild><Link to="/signup">Get Started</Link></GradientButton>
        </div>
      </div>
    </header>
  );
}