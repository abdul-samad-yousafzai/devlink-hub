import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;

  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;

  signUpWithEmail: (
    email: string,
    password: string,
    meta: { full_name: string; username: string }
  ) => Promise<{ error: string | null }>;

  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** LOAD PROFILE */
async function loadProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url, bio")
    .eq("id", userId)
    .single();

  if (error) return null;
  return data as Profile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const { data } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!mounted) return;

        setSession(newSession);

        if (newSession?.user) {
          const p = await loadProfile(newSession.user.id);
          setProfile(p);
        } else {
          setProfile(null);
        }
      }
    );

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;

      setSession(data.session);

      if (data.session?.user) {
        const p = await loadProfile(data.session.user.id);
        setProfile(p);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    profile,
    loading,

    signInWithEmail: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error: error?.message ?? null };
    },

    signUpWithEmail: async (email, password, meta) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: meta,
        },
      });

      return { error: error?.message ?? null };
    },

    signInWithGoogle: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/feed`,
        },
      });

      return { error: error?.message ?? null };
    },

    signOut: async () => {
      await supabase.auth.signOut();
    },

    refreshProfile: async () => {
      if (session?.user) {
        const p = await loadProfile(session.user.id);
        setProfile(p);
      }
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}