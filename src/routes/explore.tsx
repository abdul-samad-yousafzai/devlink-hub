import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/devconnect/AppShell";
import { ComingSoon } from "@/components/devconnect/ComingSoon";

export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [{ title: "Explore · DevConnect" }] }),
  component: () => (
    <AppShell>
      <ComingSoon title="Explore" description="Discover trending posts, rising developers, and hot tags. Coming soon." />
    </AppShell>
  ),
});