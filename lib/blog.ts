import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published: boolean;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  reading_time: number | null;
  views: number;
  published_at: string | null;
  featured: boolean;
  canonical_url: string | null;
  og_image: string | null;
  author_name: string;
  author_bio: string | null;
  author_image: string | null;
  created_at: string;
  updated_at: string;
  categories?: { name: string; slug: string }[];
}

// ========== STATIC/BUILD-TIME FUNCTIONS (no cookies) ==========

export async function getPublishedPostsStatic(options?: {
  limit?: number;
  featured?: boolean;
}): Promise<BlogPost[]> {
  const supabase = createStaticClient();

  let query = supabase
    .from("posts")
    .select(`*, categories:post_categories(category:categories(name, slug))`)
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (options?.featured) {
    query = query.eq("featured", true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return (data || []).map((post: any) => ({
    ...post,
    categories: post.categories?.map((c: any) => c.category) || [],
  })) as BlogPost[];
}

export async function getPostBySlugStatic(
  slug: string,
): Promise<BlogPost | null> {
  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("posts")
    .select(`*, categories:post_categories(category:categories(name, slug))`)
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    console.error("Error fetching post:", error);
    return null;
  }

  return {
    ...data,
    categories: data.categories?.map((c: any) => c.category) || [],
  } as BlogPost;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true);

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  return (data || []).map((post: any) => post.slug);
}

export async function getRelatedPostsStatic(
  currentSlug: string,
  tags: string[],
  limit: number = 3,
): Promise<BlogPost[]> {
  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .neq("slug", currentSlug)
    .overlaps("tags", tags)
    .limit(limit);

  if (error || !data || data.length === 0) {
    const { data: fallbackData } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .neq("slug", currentSlug)
      .order("published_at", { ascending: false })
      .limit(limit);

    return (fallbackData || []) as BlogPost[];
  }

  return data as BlogPost[];
}

// ========== DYNAMIC/REQUEST-TIME FUNCTIONS (with cookies) ==========

export async function getPublishedPosts(options?: {
  limit?: number;
  featured?: boolean;
  categorySlug?: string;
  searchQuery?: string;
}): Promise<BlogPost[]> {
  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select(`*, categories:post_categories(category:categories(name, slug))`)
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (options?.featured) {
    query = query.eq("featured", true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.categorySlug) {
    query = query.eq("post_categories.category.slug", options.categorySlug);
  }

  if (options?.searchQuery) {
    query = query.or(
      `title.ilike.%${options.searchQuery}%,excerpt.ilike.%${options.searchQuery}%,content.ilike.%${options.searchQuery}%`,
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return (data || []).map((post: any) => ({
    ...post,
    categories: post.categories?.map((c: any) => c.category) || [],
  })) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(`*, categories:post_categories(category:categories(name, slug))`)
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    console.error("Error fetching post:", error);
    return null;
  }

  return {
    ...data,
    categories: data.categories?.map((c: any) => c.category) || [],
  } as BlogPost;
}

export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit: number = 3,
): Promise<BlogPost[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .neq("slug", currentSlug)
    .overlaps("tags", tags)
    .limit(limit);

  if (error || !data || data.length === 0) {
    const { data: fallbackData } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .neq("slug", currentSlug)
      .order("published_at", { ascending: false })
      .limit(limit);

    return (fallbackData || []) as BlogPost[];
  }

  return data as BlogPost[];
}

export async function incrementViews(postId: string): Promise<void> {
  const supabase = await createClient();
  await supabase.rpc("increment_post_views", { post_id: postId });
}

// ========== UTILITIES ==========

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateISO(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toISOString();
}
