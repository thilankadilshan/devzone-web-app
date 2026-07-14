"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/Dashboard.module.css";

interface DashboardNavProps {
  user: {
    email?: string | null;
  } | null;
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/posts", label: "Posts" },
    { href: "/dashboard/categories", label: "Categories" },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        {/* Left: Brand + Back Link */}
        <div className={styles.navLeft}>
          <Link href="/" className={styles.backLink}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Portfolio
          </Link>
          <div className={styles.navDivider} />
          <span className={styles.navBrand}>DILSHAN DEVZONE</span>
        </div>

        {/* Center: Nav Links */}
        <div className={styles.navCenter}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: User + Logout */}
        <div className={styles.navRight}>
          <span className={styles.userEmail}>{user?.email}</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* Red accent line */}
      <div className={styles.navAccent} />
    </nav>
  );
}
