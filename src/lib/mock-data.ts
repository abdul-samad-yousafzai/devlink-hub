import type { Post, TrendingTag, User } from "@/types";

export const currentUser: User = {
  id: "u_me",
  username: "you",
  fullName: "You",
  avatarUrl: "https://api.dicebear.com/9.x/glass/svg?seed=you",
  skills: ["TypeScript", "React", "Rust"],
  followerCount: 128,
  followingCount: 240,
  postCount: 12,
};

export const users: User[] = [
  {
    id: "u_1",
    username: "leerob",
    fullName: "Lee Robinson",
    avatarUrl: "https://api.dicebear.com/9.x/glass/svg?seed=leerob",
    coverUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    bio: "VP of Product at Vercel. I write about the web.",
    location: "Des Moines, IA",
    website: "leerob.io",
    githubUrl: "github.com/leerob",
    skills: ["Next.js", "React", "TypeScript", "Tailwind"],
    isVerified: true,
    followerCount: 124800,
    followingCount: 412,
    postCount: 1284,
    githubStars: 24800,
  },
  {
    id: "u_2",
    username: "shadcn",
    fullName: "shadcn",
    avatarUrl: "https://api.dicebear.com/9.x/glass/svg?seed=shadcn",
    bio: "Building UI tools. Designing systems.",
    skills: ["Design Systems", "React", "Radix"],
    isVerified: true,
    followerCount: 89200,
    followingCount: 128,
    postCount: 642,
  },
  {
    id: "u_3",
    username: "rauchg",
    fullName: "Guillermo Rauch",
    avatarUrl: "https://api.dicebear.com/9.x/glass/svg?seed=rauchg",
    bio: "CEO @ Vercel. Creator of Next.js, Socket.io.",
    skills: ["Distributed Systems", "Node.js", "AI"],
    isVerified: true,
    followerCount: 312400,
    followingCount: 980,
    postCount: 4120,
  },
  {
    id: "u_4",
    username: "sarahdev",
    fullName: "Sarah Chen",
    avatarUrl: "https://api.dicebear.com/9.x/glass/svg?seed=sarah",
    bio: "Rust + WASM. Building fast things.",
    skills: ["Rust", "WebAssembly", "Systems"],
    followerCount: 4280,
    followingCount: 312,
    postCount: 184,
  },
  {
    id: "u_5",
    username: "kentcdodds",
    fullName: "Kent C. Dodds",
    avatarUrl: "https://api.dicebear.com/9.x/glass/svg?seed=kent",
    bio: "Improving the world with quality software.",
    skills: ["Testing", "React", "Remix"],
    isVerified: true,
    followerCount: 198400,
    followingCount: 240,
    postCount: 3210,
  },
];

const now = Date.now();
const hours = (h: number) => new Date(now - h * 3600_000).toISOString();

export const posts: Post[] = [
  {
    id: "p_1",
    author: users[0],
    content:
      "Just shipped a 40% improvement in cold-start times by moving our edge runtime to streaming SSR. Sometimes the simplest changes have the biggest impact. 🚀",
    tags: ["nextjs", "performance", "edge"],
    likeCount: 1284,
    commentCount: 92,
    shareCount: 142,
    liked: true,
    createdAt: hours(0.5),
  },
  {
    id: "p_2",
    author: users[3],
    content:
      "Wrote a tiny Rust macro to make derive(Debug) actually useful for large structs. Truncates long fields, pretty-prints nested ones. Sharing if anyone wants it:",
    codeSnippet: `#[derive(SmartDebug)]
pub struct Request {
    pub id: Uuid,
    pub headers: HashMap<String, String>,
    pub body: Vec<u8>, // auto-truncated to 64 bytes in Debug
}

impl Request {
    pub fn new(body: impl Into<Vec<u8>>) -> Self {
        Self { id: Uuid::new_v4(), headers: HashMap::new(), body: body.into() }
    }
}`,
    language: "rust",
    tags: ["rust", "macros"],
    likeCount: 482,
    commentCount: 38,
    shareCount: 24,
    createdAt: hours(2),
  },
  {
    id: "p_3",
    author: users[1],
    content:
      "New components dropping this week: Sidebar 2.0, Command palette refactor, and a brand new Charts primitive built on Recharts. Open source as always. 🌿",
    imageUrls: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    ],
    tags: ["design-systems", "opensource"],
    likeCount: 2140,
    commentCount: 184,
    shareCount: 312,
    bookmarked: true,
    createdAt: hours(5),
  },
  {
    id: "p_4",
    author: users[2],
    content:
      "Hot take: most teams overcomplicate their CI. A 3-line bash script and a single GitHub Action can take you to series B.",
    tags: ["devops", "startups"],
    likeCount: 3820,
    commentCount: 412,
    shareCount: 240,
    createdAt: hours(9),
  },
  {
    id: "p_5",
    author: users[4],
    content:
      "Reminder: writing tests is faster than debugging in production at 2am. Future you will say thank you.",
    tags: ["testing", "wisdom"],
    likeCount: 1620,
    commentCount: 96,
    shareCount: 184,
    createdAt: hours(22),
  },
];

export const trendingTags: TrendingTag[] = [
  { name: "rust", postCount: 12480 },
  { name: "ai", postCount: 28492 },
  { name: "typescript", postCount: 18240 },
  { name: "opensource", postCount: 9821 },
  { name: "webgpu", postCount: 3120 },
];

export const suggestedUsers = users.slice(2, 5);

export function getUserByUsername(username: string): User | undefined {
  if (username === currentUser.username) return currentUser;
  return users.find((u) => u.username === username);
}

export function getPostsByUserId(userId: string): Post[] {
  return posts.filter((p) => p.author.id === userId);
}