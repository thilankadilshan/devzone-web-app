import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const { count } = await supabase
    .from("post_likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", post.id);

  return NextResponse.json({ likes: count || 0 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Get IP hash for deduplication (simplified)
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const ipHash = await crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(ip))
    .then((buf) =>
      Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
    );

  // Check if already liked
  const { data: existing } = await supabase
    .from("post_likes")
    .select("id")
    .eq("post_id", post.id)
    .eq("ip_hash", ipHash)
    .single();

  if (existing) {
    // Unlike
    await supabase.from("post_likes").delete().eq("id", existing.id);
    return NextResponse.json({ liked: false });
  } else {
    // Like
    await supabase.from("post_likes").insert({
      post_id: post.id,
      ip_hash: ipHash,
    });
    return NextResponse.json({ liked: true });
  }
}
