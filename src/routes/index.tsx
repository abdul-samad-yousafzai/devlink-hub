import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Code2, GitBranch, MessageSquare, Sparkles, Users, Zap } from "lucide-react";
import { Logo } from "@/components/devconnect/Logo";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/devconnect/PostCard";
import { posts } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevConnect — Where Developers Build Together" },
      { name: "description", content: "The premium social network for software engineers, open-source contributors, and indie hackers. Code. Connect. Collaborate." },
      { property: "og:title", content: "DevConnect — Where Developers Build Together" },
      { property: "og:description", content: "Code. Connect. Collaborate." },
    ],
  }),
  component: Landing,
});

const techStack = ["TypeScript", "React", "Rust", "Next.js", "Postgres", "Go", "WebGPU", "Kubernetes", "Tailwind", "Bun", "Vite", "Astro"];

function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Mesh background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-mesh opacity-60" />
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,var(--background)_80%)]" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#community" className="hover:text-foreground transition-colors">Community</a>
            <a href="#stack" className="hover:text-foreground transition-colors">Stack</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-90">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-32">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm"
          >
            <Sparkles className="h-3 w-3 text-accent" />
            Now in private beta · 12,400+ developers waiting
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
          >
            Where developers
            <br />
            <span className="text-gradient-brand">build together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            DevConnect is the social platform built for engineers. Share code, ship in public,
            and find your people — without the noise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/register">
              <Button size="lg" className="h-12 px-6 bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-90">
                Get started free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/feed">
              <Button size="lg" variant="outline" className="h-12 px-6 border-border bg-card/40 backdrop-blur-sm">
                Explore the feed
              </Button>
            </Link>
          </motion.div>

          {/* Floating preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative mx-auto mt-20 max-w-2xl"
          >
            <div className="absolute -inset-10 bg-gradient-brand opacity-20 blur-3xl" />
            <div className="relative">
              <PostCard post={posts[1]} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento features */}
      <section id="features" className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Built for the way you work.</h2>
            <p className="mt-4 text-muted-foreground">Every feature designed with developer ergonomics in mind.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
            <BentoCard className="md:col-span-2 md:row-span-2" icon={Code2} title="First-class code">
              <p>Syntax-highlighted snippets in posts and DMs across 80+ languages. Copy with one click.</p>
              <div className="mt-6 rounded-xl border border-border bg-[oklch(0.1_0.02_270)] p-4 font-mono text-xs leading-relaxed">
                <span className="text-[oklch(0.7_0.15_310)]">const</span>{" "}
                <span className="text-[oklch(0.85_0.13_75)]">connect</span>{" "}={" "}
                <span className="text-[oklch(0.7_0.15_200)]">async</span>{" "}() {"=>"} {"{"}<br />
                {"  "}<span className="text-[oklch(0.7_0.15_310)]">const</span> dev = <span className="text-[oklch(0.7_0.15_200)]">await</span> findYourPeople()<br />
                {"  "}<span className="text-[oklch(0.7_0.15_200)]">return</span> dev.<span className="text-[oklch(0.85_0.13_75)]">ship</span>()<br />
                {"}"}
              </div>
            </BentoCard>
            <BentoCard icon={Zap} title="Realtime everything">
              <p>Live likes, typing indicators, and instant DMs powered by WebSockets.</p>
            </BentoCard>
            <BentoCard icon={GitBranch} title="GitHub native">
              <p>Auto-import your repos, stars and contributions to your profile.</p>
            </BentoCard>
            <BentoCard icon={MessageSquare} title="Threads, not noise">
              <p>Nested conversations that stay readable, even at scale.</p>
            </BentoCard>
            <BentoCard icon={Users} title="Curated communities">
              <p>Find your tribe — Rustaceans, Gophers, indie hackers, and more.</p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Tech marquee */}
      <section id="stack" className="relative overflow-hidden border-y border-border/40 bg-card/30 py-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i} className="font-display text-3xl font-semibold text-muted-foreground/60">
              {t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section id="community" className="relative px-6 py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Your next collaborator
            <br />
            <span className="text-gradient-brand">is one post away.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Join 12,400+ developers shipping together every day.
          </p>
          <Link to="/register" className="inline-block mt-10">
            <Button size="lg" className="h-12 px-8 bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-90">
              Claim your username
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="relative border-t border-border/40 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <Logo />
          <p className="text-xs text-muted-foreground text-center md:text-right">
            © 2026 DevConnect · Developed by <span className="text-gradient-brand font-semibold">Abdul Samad</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

function BentoCard({
  className = "",
  icon: Icon,
  title,
  children,
}: {
  className?: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm hover:shadow-elegant ${className}`}
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
      <div className="relative">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/60">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
        <div className="mt-2 text-sm text-muted-foreground">{children}</div>
      </div>
    </motion.div>
  );
}