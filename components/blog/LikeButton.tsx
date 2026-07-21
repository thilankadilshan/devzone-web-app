"use client";

import { useState, useEffect } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch initial likes
    fetch(`/api/posts/${slug}/likes`)
      .then((r) => r.json())
      .then((data) => setLikes(data.likes || 0))
      .catch(() => {});

    // Check if already liked (localStorage)
    setLiked(localStorage.getItem(`liked_${slug}`) === "true");
  }, [slug]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${slug}/likes`, { method: "POST" });
      const data = await res.json();

      setLiked(data.liked);
      setLikes((prev) => (data.liked ? prev + 1 : prev - 1));
      localStorage.setItem(`liked_${slug}`, data.liked ? "true" : "false");
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
        liked
          ? "bg-red-500/10 border-red-500/30 text-red-400"
          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span>{likes}</span>
    </button>
  );
}
