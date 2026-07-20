import { createClient } from "@/lib/supabase/server";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentPosts from "@/components/dashboard/RecentPosts";
import styles from "@/styles/Dashboard.module.css";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { count: totalPosts } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });

  const { count: publishedCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  const { count: draftCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("published", false);

  const { data: viewsData } = await supabase.from("posts").select("views");

  const totalViews =
    viewsData?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;

  const { data: recentPosts } = await supabase
    .from("posts")
    .select("id, title, slug, published, created_at, views")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
        <p>Welcome back, Thilanka. Manage your blog and content here.</p>
      </div>

      <StatsCards
        totalPosts={totalPosts || 0}
        totalViews={totalViews}
        publishedCount={publishedCount || 0}
        draftCount={draftCount || 0}
      />

      <div className={styles.section}>
        <RecentPosts posts={recentPosts || []} />
      </div>
    </div>
  );
}
