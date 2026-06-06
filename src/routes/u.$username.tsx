import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { AppShell } from "@/components/devconnect/AppShell";
import { PostCard } from "@/components/devconnect/PostCard";
import { UserAvatar } from "@/components/devconnect/UserAvatar";
import { Button } from "@/components/ui/button";
import { fetchPostsByAuthor, fetchProfileByUsername } from "@/lib/posts-service";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";

interface ProfileRow {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

export const Route = createFileRoute("/u/$username")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.username} · DevConnect` },
      { name: "description", content: `Profile of @${params.username} on DevConnect.` },
    ],
  }),
  component: ProfilePage,
});

const tabs = ["Posts", "Media", "Likes", "Bookmarks"] as const;

function ProfilePage() {
  const { username } = Route.useParams();
  const { profile: me } = useAuth();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState<typeof tabs[number]>("Posts");

  useEffect(() => {
    setLoading(true);
    fetchProfileByUsername(username).then(async (p) => {
      setProfile(p as ProfileRow | null);
      if (p) setPosts(await fetchPostsByAuthor((p as ProfileRow).id));
      setLoading(false);
    });
  }, [username]);

  if (loading) {
    return (
      <AppShell>
        <div className="flex justify-center py-24 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </AppShell>
    );
  }

  if (!profile) {
    return (
      <AppShell>
        <div className="px-5 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">User not found</h1>
          <p className="mt-2 text-muted-foreground">@{username} doesn't exist on DevConnect.</p>
        </div>
      </AppShell>
    );
  }

  const isMe = me?.id === profile.id;
  const avatarUrl = profile.avatar_url ?? `https://api.dicebear.com/9.x/glass/svg?seed=${profile.username}`;
  const joined = new Date(profile.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <AppShell>
      <div className="pb-24 lg:pb-0">
        {/* Cover */}
        <div className="relative h-48 md:h-60 overflow-hidden">
          <div className="h-full w-full bg-gradient-brand opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Header */}
        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-16">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.5 }}>
              <UserAvatar
                user={{ fullName: profile.full_name, avatarUrl }}
                size="2xl"
                className="ring-4 ring-background rounded-full"
              />
            </motion.div>
            {!isMe && (
              <Button
                onClick={() => setFollowing((p) => !p)}
                className={cn(
                  "rounded-full font-semibold",
                  following
                    ? "bg-card text-foreground border border-border hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
                    : "bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-90",
                )}
              >
                {following ? "Following" : "Follow"}
              </Button>
            )}
          </div>

          <div className="mt-4">
            <h1 className="font-display text-2xl font-bold flex items-center gap-2">
              {profile.full_name}
            </h1>
            <p className="text-muted-foreground">@{profile.username}</p>
            {profile.bio && <p className="mt-3 text-[15px]">{profile.bio}</p>}

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />Joined {joined}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-6 text-sm">
              <Stat label="Posts" value={posts.length} />
              <Stat label="Followers" value={0} />
              <Stat label="Following" value={0} />
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative px-4 py-3 text-sm font-medium transition-colors",
                  tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
                {tab === t && (
                  <motion.div layoutId="profile-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-brand rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-5 space-y-4">
            {posts.length > 0 ? (
              posts.map((p: Post) => <PostCard key={p.id} post={p} />)
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card/30 p-12 text-center">
                <p className="text-sm text-muted-foreground">No {tab.toLowerCase()} yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, icon }: { label: string; value: number; icon?: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="font-display font-bold text-foreground tabular-nums">{value.toLocaleString()}</span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}