export interface User {
  id: string;

  username: string;
  fullName: string;

  avatarUrl: string;
  coverUrl?: string;

  bio?: string;
  location?: string;
  website?: string;
  githubUrl?: string;

  skills: string[];

  isVerified: boolean;

  followerCount: number;
  followingCount: number;
  postCount: number;

  githubStars?: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id: string;

  author: User;

  content: string;

  imageUrls: string[];

  codeSnippet?: string;
  language?: string;

  tags: string[];

  likeCount: number;
  commentCount: number;
  shareCount: number;

  liked: boolean;
  bookmarked: boolean;

  createdAt: string;
  updatedAt?: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  likeCount: number;
  createdAt: string;
}

export interface Notification {
  id: string;

  type: "like" | "comment" | "follow" | "message";

  sender: User;
  receiverId: string;

  postId?: string;

  isRead: boolean;

  createdAt: string;
}

export interface TrendingTag {
  name: string;
  postCount: number;
}

export interface FollowRelation {
  followerId: string;
  followingId: string;
  createdAt: string;
}