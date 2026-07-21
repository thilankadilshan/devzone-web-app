"use client";

import { useEffect } from "react";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Only count view once per session
    const viewedKey = `viewed_${slug}`;
    if (sessionStorage.getItem(viewedKey)) return;

    fetch(`/api/posts/${slug}/views`, { method: "POST" })
      .then(() => sessionStorage.setItem(viewedKey, "true"))
      .catch(() => {});
  }, [slug]);

  return null;
}
