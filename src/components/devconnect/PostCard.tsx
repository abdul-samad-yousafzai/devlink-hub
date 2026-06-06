import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { formatDistanceToNowStrict } from "date-fns";
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";
import type { Post } from "@/types";
import { UserAvatar } from "./UserAvatar";
import { CodeBlock } from "./CodeBlock";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return String(n);
}

export function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.liked ?? false);
  const [bookmarked, setBookmarked] = useState(post.bookmarked ?? false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const toggleLike = () => {
    setLiked((p) => !p);
    setLikeCount((c) => c + (liked ? -1 : 1));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="group relative rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-shadow hover:shadow-elegant"
    >
      <header className="flex items-start gap-3">
        <Link to="/u/$username" params={{ username: post.author.username }}>
          <UserAvatar user={post.author} size="md" showVerified />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-sm">
            <Link
              to="/u/$username"
              params={{ username: post.author.username }}
              className="font-semibold text-foreground hover:underline truncate"
            >
              {post.author.fullName}
            </Link>
            <span className="text-muted-foreground truncate">@{post.author.username}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground whitespace-nowrap">
              {formatDistanceToNowStrict(new Date(post.createdAt))}
            </span>
          </div>
          {post.author.bio && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">{post.author.bio}</p>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </header>

      <div className="mt-3 ml-[52px] space-y-3">
        <p className="text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">{post.content}</p>

        {post.imageUrls && post.imageUrls.length > 0 && (
          <div className={cn("grid gap-2 rounded-xl overflow-hidden", post.imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
            {post.imageUrls.map((src, i) => (
              <img key={i} src={src} alt="" className="w-full h-72 object-cover rounded-xl border border-border" loading="lazy" />
            ))}
          </div>
        )}

        {post.codeSnippet && <CodeBlock code={post.codeSnippet} language={post.language ?? "tsx"} />}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="text-xs font-medium text-accent hover:underline cursor-pointer">
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 -ml-2">
          <ActionButton
            icon={<Heart className={cn("h-[18px] w-[18px] transition-all", liked && "fill-destructive text-destructive scale-110")} />}
            label={formatCount(likeCount)}
            onClick={toggleLike}
            active={liked}
            activeColor="text-destructive"
          />
          <ActionButton
            icon={<MessageCircle className="h-[18px] w-[18px]" />}
            label={formatCount(post.commentCount)}
          />
          <ActionButton
            icon={<Share2 className="h-[18px] w-[18px]" />}
            label={formatCount(post.shareCount)}
          />
          <ActionButton
            icon={<Bookmark className={cn("h-[18px] w-[18px] transition-all", bookmarked && "fill-accent text-accent")} />}
            onClick={() => setBookmarked((p) => !p)}
            active={bookmarked}
            activeColor="text-accent"
          />
        </div>
      </div>
    </motion.article>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  active,
  activeColor,
}: {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  activeColor?: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={cn(
        "group/btn flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
        active && activeColor,
      )}
    >
      {icon}
      {label && <span className="text-xs font-medium tabular-nums">{label}</span>}
    </motion.button>
  );
}