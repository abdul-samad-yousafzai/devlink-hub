import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, Bookmark, Compass, Home, LogOut, MessageSquare, Search, Settings, User } from "lucide-react";
import { Logo } from "./Logo";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();

  const profileHref = profile ? `/u/${profile.username}` : "/login";
  const navItems = [
    { to: "/feed", label: "Home", icon: Home },
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/notifications", label: "Notifications", icon: Bell },
    { to: "/messages", label: "Messages", icon: MessageSquare },
    { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
    { to: profileHref, label: "Profile", icon: User },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative mesh */}
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-mesh opacity-40" />

      <div className="relative mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 px-4 py-5 lg:flex">
          <Link to="/" className="px-2 mb-8">
            <Logo />
          </Link>
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const active = pathname === item.to || (item.to !== "/feed" && pathname.startsWith(item.to));
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to as string}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
                  <span className="flex-1">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <Link to="/feed">
            <Button className="w-full bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-90">
              New Post
            </Button>
          </Link>
          {profile ? (
            <div className="mt-4 flex items-center gap-3 rounded-xl p-2 hover:bg-muted/50 transition-colors">
              <UserAvatar
                user={{
                  fullName: profile.full_name,
                  avatarUrl: profile.avatar_url ?? `https://api.dicebear.com/9.x/glass/svg?seed=${profile.username}`,
                }}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{profile.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">@{profile.username}</p>
              </div>
              <button onClick={handleSignOut} title="Sign out" className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : !user ? (
            <Link to="/login" className="mt-4 block">
              <Button variant="outline" className="w-full">Sign in</Button>
            </Link>
          ) : null}
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 border-x border-border/60">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/70 px-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 lg:hidden">
              <Logo />
            </div>
            <div className="relative flex-1 max-w-md ml-auto lg:ml-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search developers, posts, tags…"
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted/60 border border-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-muted transition-colors"
              />
            </div>
          </header>
          {children}
        </main>

        {/* Right rail (desktop only) */}
        <aside className="sticky top-0 hidden h-screen w-80 shrink-0 overflow-y-auto px-5 py-5 xl:block" />
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-around border-t border-border bg-background/90 backdrop-blur-xl py-2 lg:hidden">
        {navItems.slice(0, 5).map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to as string}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}