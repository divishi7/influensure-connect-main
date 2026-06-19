import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "center", className }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("space-y-3", align === "center" ? "text-center mx-auto max-w-2xl" : "text-left", className)}>
      {eyebrow && (
        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium glass text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">{title}</h2>
      {description && <p className="text-base text-muted-foreground">{description}</p>}
    </div>
  );
}