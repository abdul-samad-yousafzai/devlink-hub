import { Sparkles } from "lucide-react";

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="rounded-2xl border border-border bg-card/60 p-3 mb-5 shadow-glow">
        <Sparkles className="h-6 w-6 text-accent" />
      </div>
      <h1 className="font-display text-3xl font-bold">{title}</h1>
      <p className="mt-2 max-w-md text-muted-foreground">{description}</p>
    </div>
  );
}