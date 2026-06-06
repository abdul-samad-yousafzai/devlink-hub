import { TrendingUp, Sparkles } from "lucide-react";
import { suggestedUsers, trendingTags } from "@/lib/mock-data";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function RightRail() {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border bg-card/60 p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-accent" />
          <h3 className="font-display font-semibold text-sm">Trending in Dev</h3>
        </div>
        <ul className="space-y-2">
          {trendingTags.map((t) => (
            <li key={t.name} className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/60 transition-colors cursor-pointer">
              <div>
                <p className="text-sm font-medium">#{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.postCount.toLocaleString()} posts</p>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">Hot</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card/60 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-secondary" />
          <h3 className="font-display font-semibold text-sm">Who to follow</h3>
        </div>
        <ul className="space-y-3">
          {suggestedUsers.map((u) => (
            <FollowItem key={u.id} user={u} />
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15 p-4">
        <h3 className="font-display font-semibold text-sm">DevConnect Digest</h3>
        <p className="mt-1 text-xs text-muted-foreground">A weekly roundup of the best engineering writing, curated by humans.</p>
        <Button size="sm" className="mt-3 w-full bg-foreground text-background hover:bg-foreground/90">
          Subscribe
        </Button>
      </section>
    </div>
  );
}

function FollowItem({ user }: { user: typeof suggestedUsers[number] }) {
  const [following, setFollowing] = useState(false);
  return (
    <li className="flex items-center gap-3">
      <UserAvatar user={user} size="sm" showVerified />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{user.fullName}</p>
        <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
      </div>
      <Button
        size="sm"
        variant={following ? "outline" : "default"}
        onClick={() => setFollowing((p) => !p)}
        className={cn("h-8 rounded-full text-xs px-3", !following && "bg-foreground text-background hover:bg-foreground/90")}
      >
        {following ? "Following" : "Follow"}
      </Button>
    </li>
  );
}