import { cn } from "@/lib/utils";

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8 rounded-lg bg-gradient-brand shadow-glow">
        <div className="absolute inset-[2px] rounded-[6px] bg-background flex items-center justify-center">
          <span className="font-display font-bold text-sm text-gradient-brand">{"<>"}</span>
        </div>
      </div>
      {withText && (
        <span className="font-display font-bold text-lg tracking-tight">
          Dev<span className="text-gradient-brand">Connect</span>
        </span>
      )}
    </div>
  );
}