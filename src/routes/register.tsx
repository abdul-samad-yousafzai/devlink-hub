import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/devconnect/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account · DevConnect" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    const cleanUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (!cleanUsername) {
      toast.error("Pick a valid username (letters, numbers, underscores).");
      return;
    }
    setLoading(true);
    const { error } = await signUpWithEmail(email, password, {
      full_name: fullName,
      username: cleanUsername,
    });
    setLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Account created — welcome to DevConnect!");
    navigate({ to: "/feed" });
  };

  const onGoogle = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  return (
    <AuthLayout
      title="Claim your username"
      subtitle="Join thousands of developers shipping in public."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <Button type="button" onClick={onGoogle} disabled={loading} variant="outline" className="w-full h-11">
        <GoogleIcon /> Continue with Google
      </Button>
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
      </div>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ada Lovelace" className="h-11" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ada" className="h-11" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@dev.com" className="h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="h-11" />
        </div>
        <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-90">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}

function GoogleIcon() {
  return (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.5-2.1 3.3v2.7h3.4c2-1.8 3.3-4.6 3.3-8z" />
      <path fill="#34A853" d="M12 23c2.8 0 5.2-.9 6.9-2.5l-3.4-2.7c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7C4.4 20.5 7.9 23 12 23z" />
      <path fill="#FBBC04" d="M6.2 14.5c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.8H2.7C2 9.1 1.6 10.5 1.6 12s.4 2.9 1.1 4.2l3.5-1.7z" />
      <path fill="#EA4335" d="M12 5.4c1.5 0 2.9.5 4 1.5l3-3C17.2 2.3 14.8 1.4 12 1.4 7.9 1.4 4.4 3.9 2.7 7.8l3.5 2.7C7 7.2 9.3 5.4 12 5.4z" />
    </svg>
  );
}