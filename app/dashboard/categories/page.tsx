import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CategoriesTable from "@/components/dashboard/CategoriesTable";
import styles from "@/styles/Dashboard.module.css";

export default async function CategoriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Categories</h1>
        <p>
          Organize your blog posts with categories. Edit inline or create new
          ones.
        </p>
      </div>

      {/* Create New Category Form */}
      <form
        action={async (formData: FormData) => {
          "use server";

          const name = formData.get("name") as string;
          const description = formData.get("description") as string;

          if (!name?.trim()) return;

          const supabase = await createClient();
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!user) return;

          const slug = name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .substring(0, 100);

          await supabase.from("categories").insert([
            {
              name: name.trim(),
              slug,
              description: description?.trim() || null,
            },
          ]);
        }}
        className={styles.categoryCreateForm}
      >
        <div className={styles.categoryFormRow}>
          <input
            type="text"
            name="name"
            placeholder="New category name..."
            className={styles.textInput}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description (optional)..."
            className={styles.textInput}
          />
          <button type="submit" className={styles.newPostBtn}>
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
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Category
          </button>
        </div>
      </form>

      <CategoriesTable categories={categories || []} />
    </div>
  );
}
