import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET /api/posts/[id] — get single post
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();
  const { id } = await params;

  const { data, error } = await supabase
    .from("posts")
    .select(
      `*,
      categories:post_categories(
        category:categories(id, name, slug)
      )`,
    )
    .eq("id", id)
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

// PATCH /api/posts/[id] — update post
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { category_ids, ...postData } = body;

  // Update post
  const { data, error } = await supabase
    .from("posts")
    .update(postData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Update category relations if provided
  if (category_ids !== undefined) {
    // Delete existing relations
    await supabase.from("post_categories").delete().eq("post_id", id);

    // Insert new relations
    if (category_ids.length > 0) {
      const junctionData = category_ids.map((catId: string) => ({
        post_id: id,
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

// DELETE /api/posts/[id] — delete post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
