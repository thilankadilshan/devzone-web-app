import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET /api/posts — list posts
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const published = searchParams.get("published");

  let query = supabase
    .from("posts")
    .select(
      `*,
      categories:post_categories(
        category:categories(id, name, slug)
      )`,
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  if (published === "true") query = query.eq("published", true);
  if (published === "false") query = query.eq("published", false);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Flatten nested category data
  const posts = (data || []).map((post: any) => ({
    ...post,
    categories:
      post.categories?.map((c: any) => c.category).filter(Boolean) || [],
  }));

  return NextResponse.json({ posts, count });
}

// POST /api/posts — create post
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { category_ids, ...postData } = body;

  // Insert post first
  const { data: post, error: postError } = await supabase
    .from("posts")
    .insert([postData])
    .select()
    .single();

  if (postError) {
    return NextResponse.json({ error: postError.message }, { status: 500 });
  }

  // Insert category relations if provided
  if (category_ids && category_ids.length > 0 && post) {
    const junctionData = category_ids.map((catId: string) => ({
      post_id: post.id,
      category_id: catId,
    }));

    const { error: junctionError } = await supabase
      .from("post_categories")
      .insert(junctionData);

    if (junctionError) {
      console.error("Category relation error:", junctionError);
    }
  }

  return NextResponse.json({ post }, { status: 201 });
}
