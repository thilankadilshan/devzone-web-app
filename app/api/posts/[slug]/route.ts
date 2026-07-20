import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET /api/posts/[slug] — get single post by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const supabase = await createClient();
  const { slug } = await params;

  const { data, error } = await supabase
    .from("posts")
    .select(
      `*,
      categories:post_categories(
        category:categories(id, name, slug)
      )`,
    )
    .eq("slug", slug)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  // Flatten categories and extract category_ids
  const post = {
    ...data,
    categories:
      data.categories?.map((c: any) => c.category).filter(Boolean) || [],
    category_ids:
      data.categories?.map((c: any) => c.category?.id).filter(Boolean) || [],
  };

  return NextResponse.json({ post });
}

// PATCH /api/posts/[slug] — update post by slug
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await request.json();
  const { category_ids, ...postData } = body;

  // First get the post ID from slug
  const { data: existingPost } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!existingPost) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const postId = existingPost.id;

  // Update post
  const { data, error } = await supabase
    .from("posts")
    .update(postData)
    .eq("id", postId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Update category relations if provided
  if (category_ids !== undefined) {
    // Delete existing relations
    await supabase.from("post_categories").delete().eq("post_id", postId);

    // Insert new relations
    if (category_ids.length > 0) {
      const junctionData = category_ids.map((catId: string) => ({
        post_id: postId,
        category_id: catId,
      }));

      const { error: junctionError } = await supabase
        .from("post_categories")
        .insert(junctionData);

      if (junctionError) {
        console.error("Category relation error:", junctionError);
      }
    }
  }

  return NextResponse.json({ post: data });
}

// DELETE /api/posts/[slug] — delete post by slug
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  // Get post ID from slug first
  const { data: existingPost } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!existingPost) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", existingPost.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
