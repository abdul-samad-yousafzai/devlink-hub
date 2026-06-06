import { supabase } from "@/integrations/supabase/client";
import type { Post, User } from "@/types";

interface DbPost {
  id: string;
  author_id: string;
  content: string;
  code_snippet: string | null;
  language: string | null;
  tags: string[];
  created_at: string;
  profiles: {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string | null;
    bio: string | null;
  } | null;
}

function toPost(row: DbPost): Post {
  const p = row.profiles;
  const author: User = {
    id: p?.id ?? row.author_id,
    username: p?.username ?? "unknown",
    fullName: p?.full_name ?? "Unknown",
    avatarUrl:
      p?.avatar_url ??
      `https://api.dicebear.com/9.x/glass/svg?seed=${p?.username ?? row.author_id}`,
    bio: p?.bio ?? undefined,
    skills: [],
    followerCount: 0,
    followingCount: 0,
    postCount: 0,
  };
  return {
    id: row.id,
    author,
    content: row.content,
    codeSnippet: row.code_snippet ?? undefined,
    language: row.language ?? undefined,
    tags: row.tags ?? [],
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    createdAt: row.created_at,
  };
}

const SELECT = "id, author_id, content, code_snippet, language, tags, created_at, profiles!posts_author_id_fkey(id, username, full_name, avatar_url, bio)";

export async function fetchFeed(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(SELECT)
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data as unknown as DbPost[]).map(toPost);
}

export async function fetchPostsByAuthor(authorId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(SELECT)
    .eq("author_id", authorId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as unknown as DbPost[]).map(toPost);
}

export async function createPost(input: {
  authorId: string;
  content: string;
  codeSnippet?: string;
  language?: string;
}): Promise<Post> {
  const tags = Array.from(input.content.matchAll(/#(\w+)/g)).map((m) => m[1]);
  const { data, error } = await supabase
    .from("posts")
    .insert({
      author_id: input.authorId,
      content: input.content,
      code_snippet: input.codeSnippet ?? null,
      language: input.language ?? null,
      tags,
    })
    .select(SELECT)
    .single();
  if (error) throw error;
  return toPost(data as unknown as DbPost);
}

export async function fetchProfileByUsername(username: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url, bio, created_at")
    .eq("username", username)
    .maybeSingle();
  if (error) throw error;
  return data;
}