"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import TipTapEditor from "./TipTapEditor";
import styles from "@/styles/PostForm.module.css";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PostFormData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  og_image: string;
  meta_title: string;
  meta_description: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  canonical_url: string;
  category_ids: string[];
}

interface PostFormProps {
  initialData?: Partial<PostFormData>;
  mode: "create" | "edit";
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 100);
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function calculateSEOScore(data: PostFormData): {
  score: number;
  label: string;
} {
  let score = 0;
  const checks = [
    data.title.length >= 30 && data.title.length <= 60,
    data.slug.length > 0,
    data.excerpt.length >= 120 && data.excerpt.length <= 160,
    data.content.length >= 500,
    data.meta_title.length >= 30 && data.meta_title.length <= 60,
    data.meta_description.length >= 120 && data.meta_description.length <= 160,
    data.tags.length >= 2,
    data.cover_image.length > 0,
    data.category_ids.length > 0,
  ];

  score = (checks.filter(Boolean).length / checks.length) * 100;

  let label = "Needs Work";
  if (score >= 80) label = "Excellent";
  else if (score >= 60) label = "Good";
  else if (score >= 40) label = "Fair";

  return { score: Math.round(score), label };
}

export default function PostForm({ initialData, mode }: PostFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [form, setForm] = useState<PostFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "<p></p>",
    cover_image: "",
    og_image: "",
    meta_title: "",
    meta_description: "",
    tags: [],
    published: false,
    featured: false,
    canonical_url: "",
    category_ids: [],
    ...initialData,
  });

  // Fetch categories on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(console.error)
      .finally(() => setCategoriesLoading(false));
  }, []);

  const seoScore = calculateSEOScore(form);

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: mode === "create" && !prev.slug ? generateSlug(title) : prev.slug,
      meta_title:
        mode === "create" && !prev.meta_title ? title : prev.meta_title,
    }));
  };

  const handleSlugChange = (slug: string) => {
    setForm((prev) => ({
      ...prev,
      slug: slug
        .toLowerCase()
        .replace(/[^\w-]/g, "")
        .replace(/-+/g, "-"),
    }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag) && form.tags.length < 10) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const toggleCategory = (categoryId: string) => {
    setForm((prev) => {
      const hasCategory = prev.category_ids.includes(categoryId);
      if (hasCategory) {
        return {
          ...prev,
          category_ids: prev.category_ids.filter((id) => id !== categoryId),
        };
      }
      return {
        ...prev,
        category_ids: [...prev.category_ids, categoryId],
      };
    });
  };

  // Upload cover image to Supabase Storage (direct is fine for storage)
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    setIsSaving(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        alert("Upload failed: " + uploadError.message);
        setIsSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      setForm((prev) => ({
        ...prev,
        cover_image: urlData.publicUrl,
        og_image: prev.og_image || urlData.publicUrl,
      }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }

    setIsSaving(false);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.slug.trim()) newErrors.slug = "Slug is required";
    if (!form.content.trim() || form.content === "<p></p>")
      newErrors.content = "Content is required";
    if (form.excerpt.length > 300)
      newErrors.excerpt = "Excerpt must be under 300 characters";
    if (form.meta_title.length > 60)
      newErrors.meta_title = "Meta title must be under 60 characters";
    if (form.meta_description.length > 160)
      newErrors.meta_description =
        "Meta description must be under 160 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================
  // MERN-STYLE: Use API routes instead of direct Supabase
  // ============================================
  const handleSubmit = async (publish: boolean) => {
    if (!validate()) return;

    setIsSaving(true);

    const readingTime = calculateReadingTime(form.content);
    const dataToSave = {
      ...form,
      published: publish,
      reading_time: readingTime,
      updated_at: new Date().toISOString(),
    };

    try {
      let response;

      if (mode === "create") {
        // POST /api/posts — create new post
        response = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSave),
        });
      } else {
        // PATCH /api/posts/[id] — update existing post
        response = await fetch(`/api/posts/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSave),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        alert("Error: " + (result.error || "Something went wrong"));
        setIsSaving(false);
        return;
      }

      // Success — redirect to posts list
      router.push("/dashboard/posts");
      router.refresh();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save post. Check console.");
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {isSaving && (
        <div className={styles.savingOverlay}>
          <div className={styles.savingSpinner} />
          <p>Saving...</p>
        </div>
      )}

      <div className={styles.formHeader}>
        <h1>{mode === "create" ? "New Blog Post" : "Edit Blog Post"}</h1>
        <p>Write something amazing. Optimize for SEO to rank #1 on Google.</p>
      </div>

      <div className={styles.formGrid}>
        {/* MAIN COLUMN */}
        <div className={styles.mainColumn}>
          {/* Title */}
          <div className={styles.formGroup}>
            <label>
              Post Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g., Building Scalable APIs with Node.js"
              className={`${styles.textInput} ${errors.title ? styles.errorInput : ""}`}
              maxLength={100}
            />
            {errors.title && (
              <span className={styles.errorText}>{errors.title}</span>
            )}
          </div>

          {/* Slug */}
          <div className={styles.formGroup}>
            <label>
              URL Slug <span className={styles.required}>*</span>
            </label>
            <div className={styles.slugField}>
              <span className={styles.slugPrefix}>/blog/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="building-scalable-apis"
                className={`${styles.textInput} ${errors.slug ? styles.errorInput : ""}`}
                maxLength={100}
              />
            </div>
            {errors.slug && (
              <span className={styles.errorText}>{errors.slug}</span>
            )}
          </div>

          {/* Excerpt */}
          <div className={styles.formGroup}>
            <label>
              Excerpt <span>(shown in blog cards & Google snippet)</span>
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) =>
                setForm((p) => ({ ...p, excerpt: e.target.value }))
              }
              placeholder="A compelling summary that makes people want to click..."
              className={`${styles.textareaInput} ${errors.excerpt ? styles.errorInput : ""}`}
              rows={3}
              maxLength={300}
            />
            <div className={styles.readingTime}>
              {form.excerpt.length}/300 characters
            </div>
            {errors.excerpt && (
              <span className={styles.errorText}>{errors.excerpt}</span>
            )}
          </div>

          {/* Content Editor */}
          <div className={styles.formGroup}>
            <label>
              Content <span className={styles.required}>*</span>
            </label>
            <TipTapEditor
              content={form.content}
              onChange={(html) => setForm((p) => ({ ...p, content: html }))}
            />
            {errors.content && (
              <span className={styles.errorText}>{errors.content}</span>
            )}
            <div className={styles.readingTime}>
              Estimated reading time: {calculateReadingTime(form.content)} min
            </div>
          </div>

          {/* Cover Image */}
          <div className={styles.formGroup}>
            <label>Cover Image</label>
            <div className={styles.coverUpload}>
              <div className={styles.coverPreview}>
                {form.cover_image ? (
                  <img src={form.cover_image} alt="Cover preview" />
                ) : (
                  <div className={styles.coverPlaceholder}>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p>Click to upload cover image</p>
                    <small>Recommended: 1200x630px, under 5MB</small>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className={styles.coverUploadInput}
                />
              </div>
              {form.cover_image && (
                <div className={styles.coverActions}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .querySelector<HTMLInputElement>('input[type="file"]')
                        ?.click()
                    }
                    className={styles.coverBtn}
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((p) => ({ ...p, cover_image: "", og_image: "" }))
                    }
                    className={styles.coverRemoveBtn}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className={styles.sidebar}>
          {/* SEO Score */}
          <div className={styles.sidebarCard}>
            <h3>SEO Score</h3>
            <div className={styles.seoScore}>
              <div className={styles.seoScoreBar}>
                <div
                  className={styles.seoScoreFill}
                  style={{
                    width: `${seoScore.score}%`,
                    background:
                      seoScore.score >= 80
                        ? "#22c55e"
                        : seoScore.score >= 60
                          ? "#eab308"
                          : "#e50914",
                  }}
                />
              </div>
              <span
                className={styles.seoScoreLabel}
                style={{
                  color:
                    seoScore.score >= 80
                      ? "#22c55e"
                      : seoScore.score >= 60
                        ? "#eab308"
                        : "#e50914",
                }}
              >
                {seoScore.label} ({seoScore.score}%)
              </span>
            </div>
          </div>

          {/* Publish Settings */}
          <div className={styles.sidebarCard}>
            <h3>Publish Settings</h3>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <span>Published</span>
                <small>Make this post visible to the public</small>
              </div>
              <button
                type="button"
                className={styles.toggle}
                data-active={form.published}
                onClick={() =>
                  setForm((p) => ({ ...p, published: !p.published }))
                }
              >
                <div className={styles.toggleKnob} />
              </button>
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <span>Featured</span>
                <small>Show in featured section</small>
              </div>
              <button
                type="button"
                className={styles.toggle}
                data-active={form.featured}
                onClick={() =>
                  setForm((p) => ({ ...p, featured: !p.featured }))
                }
              >
                <div className={styles.toggleKnob} />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className={styles.sidebarCard}>
            <h3>Categories</h3>
            {categoriesLoading ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                Loading categories...
              </p>
            ) : categories.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                No categories yet.{" "}
                <a
                  href="/dashboard/categories"
                  style={{ color: "var(--accent)", textDecoration: "none" }}
                >
                  Create one
                </a>
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.375rem",
                }}
              >
                {categories.map((cat) => {
                  const isSelected = form.category_ids.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 0.75rem",
                        background: isSelected
                          ? "rgba(229, 9, 20, 0.12)"
                          : "rgba(255, 255, 255, 0.03)",
                        border: `1px solid ${isSelected ? "rgba(229, 9, 20, 0.3)" : "rgba(255, 255, 255, 0.06)"}`,
                        borderRadius: "6px",
                        color: isSelected
                          ? "var(--text-main)"
                          : "var(--text-muted)",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "4px",
                          border: `1px solid ${isSelected ? "var(--accent)" : "rgba(255, 255, 255, 0.15)"}`,
                          background: isSelected
                            ? "var(--accent)"
                            : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {isSelected && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            )}
            {form.category_ids.length > 0 && (
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                {form.category_ids.length} selected
              </p>
            )}
          </div>

          {/* Meta Tags */}
          <div className={styles.sidebarCard}>
            <h3>SEO Meta Tags</h3>

            <div className={styles.formGroup} style={{ marginBottom: "1rem" }}>
              <label>
                Meta Title <span>(for Google)</span>
              </label>
              <input
                type="text"
                value={form.meta_title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, meta_title: e.target.value }))
                }
                placeholder={form.title || "SEO title..."}
                className={`${styles.textInput} ${errors.meta_title ? styles.errorInput : ""}`}
                maxLength={70}
              />
              <div className={styles.readingTime}>
                {form.meta_title.length}/60 recommended
              </div>
              {errors.meta_title && (
                <span className={styles.errorText}>{errors.meta_title}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                Meta Description <span>(for Google)</span>
              </label>
              <textarea
                value={form.meta_description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, meta_description: e.target.value }))
                }
                placeholder="Describe your post for search engines..."
                className={`${styles.textareaInput} ${errors.meta_description ? styles.errorInput : ""}`}
                rows={3}
                maxLength={170}
              />
              <div className={styles.readingTime}>
                {form.meta_description.length}/160 recommended
              </div>
              {errors.meta_description && (
                <span className={styles.errorText}>
                  {errors.meta_description}
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className={styles.sidebarCard}>
            <h3>Tags</h3>
            <div className={styles.tagsInput}>
              {form.tags.map((tag) => (
                <span key={tag} className={styles.tagPill}>
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder={
                  form.tags.length < 10 ? "Add tag..." : "Max 10 tags"
                }
                className={styles.tagInput}
                disabled={form.tags.length >= 10}
              />
            </div>
          </div>

          {/* OG Image */}
          <div className={styles.sidebarCard}>
            <h3>Social Preview</h3>
            <div className={styles.formGroup}>
              <label>
                OG Image <span>(Facebook/Twitter preview)</span>
              </label>
              <input
                type="text"
                value={form.og_image}
                onChange={(e) =>
                  setForm((p) => ({ ...p, og_image: e.target.value }))
                }
                placeholder="https://..."
                className={styles.textInput}
              />
              {form.og_image && (
                <img
                  src={form.og_image}
                  alt="OG preview"
                  style={{
                    width: "100%",
                    borderRadius: 6,
                    marginTop: 8,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
              )}
            </div>
          </div>

          {/* Canonical URL */}
          <div className={styles.sidebarCard}>
            <h3>Advanced</h3>
            <div className={styles.formGroup}>
              <label>Canonical URL</label>
              <input
                type="text"
                value={form.canonical_url}
                onChange={(e) =>
                  setForm((p) => ({ ...p, canonical_url: e.target.value }))
                }
                placeholder="https://yourdomain.com/original-post"
                className={styles.textInput}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className={styles.formActions}>
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          disabled={isSaving}
          className={styles.saveBtn}
        >
          {mode === "create" ? "Publish Post" : "Update & Publish"}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          disabled={isSaving}
          className={styles.draftBtn}
        >
          Save as Draft
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/posts")}
          className={styles.cancelBtn}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
