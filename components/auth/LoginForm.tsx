"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import styles from "@/styles/Login.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Force full page reload so middleware sets cookies properly
    // This is the KEY fix — router.push() doesn't sync cookies
    window.location.href = "/dashboard";
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.shutterTop} />
        <div className={styles.shutterBottom} />

        <h1 className={styles.title}>DILSHAN DEVZONE</h1>
        <p className={styles.subtitle}>Authorized Personnel Only</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className={styles.input}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? "Authenticating..." : "Enter Dashboard"}
          </button>
        </form>

        <p className={styles.hint}>
          This area is restricted. If you&apos;re not Thilanka Dilshan, you
          shouldn&apos;t be here.
        </p>
      </div>
    </div>
  );
}
