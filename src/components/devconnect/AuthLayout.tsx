import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left animated panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-10 bg-mesh">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.65_0.21_280/0.4),transparent_50%)]" />
        {/* Floating code particles */}
        {[
          { t: "const dev = await connect()", x: "12%", y: "20%", d: 0 },
          { t: "git push origin main", x: "60%", y: "35%", d: 0.5 },
          { t: "npm run ship", x: "25%", y: "65%", d: 1 },
          { t: "fn build() -> Future {}", x: "55%", y: "78%", d: 1.5 },
        ].map((p, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.7, 0.7, 0], y: [20, 0, 0, -20] }}
            transition={{ duration: 6, delay: p.d, repeat: Infinity, repeatDelay: 2 }}
            className="absolute font-mono text-xs text-foreground/70 whitespace-nowrap"
            style={{ left: p.x, top: p.y }}
          >
            {p.t}
          </motion.span>
        ))}

        <Link to="/" className="relative z-10"><Logo /></Link>

        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Where developers <span className="text-gradient-brand">build together.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of engineers shipping in public, sharing code, and finding their next collaborator.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8"><Link to="/"><Logo /></Link></div>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-sm text-muted-foreground text-center">{footer}</div>
        </motion.div>
      </div>
    </div>
  );
}