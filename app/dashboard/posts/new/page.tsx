import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PostForm from "@/components/dashboard/PostForm";

export default async function NewPostPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <PostForm mode="create" />
    </div>
  );
}
