import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Code2, Hash, Loader2, Sparkles } from "lucide-react";
import { AppShell } from "@/components/devconnect/AppShell";
import { PostCard } from "@/components/devconnect/PostCard";
import { RightRail } from "@/components/devconnect/RightRail";
import { UserAvatar } from "@/components/devconnect/UserAvatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { createPost, fetchFeed } from "@/lib/posts-service";
import type { Post } from "@/types";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Your feed · DevConnect" },
      { name: "description", content: "Latest posts from developers you follow on DevConnect." },
    ],
  }),
  component: FeedPage,
});

function FeedPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<"following" | "for-you">("for-you");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchFeed()
      .then(setPosts)
      .catch((e) => toast.error(e.message ?? "Failed to load feed"))
      .finally(() => setLoading(false));
  }, []);

  const submit = async () => {
    if (!user || !profile) {
      toast.error("Please sign in to post.");
      return;
    }
    const trimmed = content.trim();
    if (!trimmed) return;
    setPosting(true);
    try {
      const newPost = await createPost({
        authorId: user.id,
        content: trimmed,
        codeSnippet: showCode && code.trim() ? code : undefined,
        language: showCode && code.trim() ? "tsx" : undefined,
      });
      setPosts([newPost, ...posts]);
      setContent("");
      setCode("");
      setShowCode(false);
      toast.success("Posted!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to post");
    } finally {
      setPosting(false);
    }
  };

  return (
    <AppShell>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px]">
        <div className="px-5 py-5 pb-24 lg:pb-5">
          {/* Tabs */}
          <div className="mb-5 flex gap-1 rounded-xl border border-border bg-card/40 p-1">
            {(["for-you", "following"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-colors ${
                  tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === t && (
                  <motion.div layoutId="tab-pill" className="absolute inset-0 rounded-lg bg-muted" transition={{ type: "spring", duration: 0.4 }} />
                )}
                <span className="relative">{t.replace("-", " ")}</span>
              </button>
            ))}
          </div>

          {/* Composer */}
          {user && profile ? (
          <div className="mb-5 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm">
            <div className="flex gap-3">
              <UserAvatar
                user={{
                  fullName: profile.full_name,
                  avatarUrl: profile.avatar_url ?? `https://api.dicebear.com/9.x/glass/svg?seed=${profile.username}`,
                }}
                size="md"
              />
              <div className="flex-1">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What are you building today?"
                  rows={2}
                  className="w-full resize-none bg-transparent text-[15px] placeholder:text-muted-foreground focus:outline-none"
                />
                {showCode && (
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// paste a code snippet…"
                    rows={4}
                    className="mt-2 w-full resize-none rounded-lg border border-border bg-background/60 p-3 font-mono text-xs placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
                  />
                )}
                <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                  <div className="flex gap-1 text-muted-foreground">
                    <Button onClick={() => setShowCode((s) => !s)} variant="ghost" size="icon" className={`h-8 w-8 hover:text-accent ${showCode ? "text-accent" : ""}`}><Code2 className="h-4 w-4" /></Button>
                    <Button onClick={() => setContent((c) => c + " #")} variant="ghost" size="icon" className="h-8 w-8 hover:text-accent"><Hash className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs tabular-nums ${content.length > 280 ? "text-warning" : "text-muted-foreground"}`}>
                      {280 - content.length}
                    </span>
                    <Button
                      onClick={submit}
                      disabled={!content.trim() || posting}
                      size="sm"
                      className="bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-90 disabled:opacity-40"
                    >
                      {posting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><Sparkles className="mr-1.5 h-3.5 w-3.5" />Post</>}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ) : !authLoading ? (
            <div className="mb-5 rounded-2xl border border-dashed border-border bg-card/30 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>{" "}
                or{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">create an account</Link>{" "}
                to share what you're building.
              </p>
            </div>
          ) : null}

          {/* Feed */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-12 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card/30 p-12 text-center">
                <p className="text-sm text-muted-foreground">No posts yet. Be the first to share!</p>
              </div>
            ) : (
              posts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i, 5) * 0.05 }}
                >
                  <PostCard post={p} />
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="hidden xl:block py-5 pr-5">
          <RightRail />
        </div>
      </div>
    </AppShell>
  );
}