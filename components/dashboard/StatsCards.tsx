"use client";

import styles from "@/styles/Dashboard.module.css";

interface StatsCardsProps {
  totalPosts: number;
  totalViews: number;
}

export default function StatsCards({
  totalPosts,
  totalViews,
}: StatsCardsProps) {
  const stats = [
    { label: "Total Posts", value: totalPosts },
    { label: "Total Views", value: totalViews },
    { label: "Published", value: 0 }, // We'll wire this later
    { label: "Drafts", value: 0 }, // We'll wire this later
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.statCard}>
          <span className={styles.statValue}>{stat.value}</span>
          <span className={styles.statLabel}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
