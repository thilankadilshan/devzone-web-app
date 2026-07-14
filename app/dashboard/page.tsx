import { createClient } from "@/lib/supabase/server";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentPosts from "@/components/dashboard/RecentPosts";
import styles from "@/styles/Dashboard.module.css";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { count: postCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
        <p>Welcome back, Thilanka. Manage your blog and content here.</p>
      </div>

      <StatsCards totalPosts={postCount || 0} totalViews={0} />

      <div className={styles.section}>
        <RecentPosts />
      </div>
    </div>
  );
}
