import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";
import type { User } from "@/types";

const sizeMap = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-lg",
  "2xl": "h-32 w-32 text-2xl",
} as const;

export function UserAvatar({
  user,
  size = "md",
  ring = false,
  showVerified = false,
  className,
}: {
  user: Pick<User, "avatarUrl" | "fullName" | "isVerified">;
  size?: keyof typeof sizeMap;
  ring?: boolean;
  showVerified?: boolean;
  className?: string;
}) {
  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className={cn("relative inline-block", className)}>
      <Avatar
        className={cn(
          sizeMap[size],
          ring && "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-glow",
        )}
      >
        <AvatarImage src={user.avatarUrl} alt={user.fullName} />
        <AvatarFallback className="bg-gradient-brand text-primary-foreground font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      {showVerified && user.isVerified && (
        <BadgeCheck
          className="absolute -bottom-0.5 -right-0.5 h-4 w-4 fill-accent text-background"
          strokeWidth={2.5}
        />
      )}
    </div>
  );
}