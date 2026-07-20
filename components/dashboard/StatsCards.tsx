"use client";

import styles from "@/styles/Dashboard.module.css";

interface StatsCardsProps {
  totalPosts: number;
  totalViews: number;
  publishedCount: number;
  draftCount: number;
  categoriesCount: number;
}

export default function StatsCards({
  totalPosts,
  totalViews,
  publishedCount,
  draftCount,
  categoriesCount,
}: StatsCardsProps) {
  const stats = [
    { label: "Total Posts", value: totalPosts },
    { label: "Total Views", value: totalViews },
    { label: "Published", value: publishedCount },
    { label: "Categories", value: categoriesCount },
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.statCard}>
          <span className={styles.statValue}>
            {stat.value.toLocaleString()}
          </span>
          <span className={styles.statLabel}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
