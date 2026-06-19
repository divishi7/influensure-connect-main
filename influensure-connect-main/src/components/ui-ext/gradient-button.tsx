import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const GradientButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      className={cn(
        "gradient-bg text-primary-foreground border-0 shadow-glow hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200",
        className,
      )}
      {...props}
    />
  ),
);
GradientButton.displayName = "GradientButton";