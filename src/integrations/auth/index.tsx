import { supabase } from "@/integrations/supabase/client";

export type OAuthProvider = "google" | "apple" | "microsoft";

export type AuthResponse = {
  data: unknown | null;
  error: string | null;
};

export const auth = {
  signInWithOAuth: async (
    provider: OAuthProvider,
    redirectPath: string = "/feed"
  ): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + redirectPath,
      },
    });

    return {
      data: data ?? null,
      error: error?.message ?? null,
    };
  },

  signInWithEmail: async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      data: data ?? null,
      error: error?.message ?? null,
    };
  },

  signUpWithEmail: async (
    email: string,
    password: string,
    meta?: Record<string, any>
  ): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: meta,
      },
    });

    return {
      data: data ?? null,
      error: error?.message ?? null,
    };
  },

  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  },

  signOut: async (): Promise<AuthResponse> => {
    const { error } = await supabase.auth.signOut();

    return {
      data: null,
      error: error?.message ?? null,
    };
  },
};

export default auth;