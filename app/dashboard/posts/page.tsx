import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PostsTable from "@/components/dashboard/PostsTable";
import PostSearch from "@/components/dashboard/PostSearch";
import styles from "@/styles/Dashboard.module.css";

interface PostsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const page = Math.max(1, parseInt((params.page as string) || "1", 10));
  const search = (params.search as string) || "";
  const status = (params.status as string) || "all";
  const limit = 10;
  const offset = (page - 1) * limit;

  // Build query
  let query = supabase.from("posts").select("*", { count: "exact" });

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,excerpt.ilike.%${search}%,tags.cs.{${search}}`,
    );
  }

  if (status === "published") {
    query = query.eq("published", true);
  } else if (status === "draft") {
    query = query.eq("published", false);
  }

  const {
    data: posts,
    count,
    error,
  } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching posts:", error);
  }

  const totalPages = count ? Math.ceil(count / limit) : 0;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Blog Posts</h1>
        <p>
          Manage your blog posts. Create, edit, publish, and optimize for SEO.
        </p>
      </div>

      <PostSearch
        initialSearch={search}
        initialStatus={status}
        totalPosts={count || 0}
      />

      <PostsTable
        posts={posts || []}
        currentPage={page}
        totalPages={totalPages}
        totalPosts={count || 0}
      />
    </div>
  );
}
