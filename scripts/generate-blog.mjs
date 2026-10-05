import Groq from "groq-sdk";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import dotenv from "dotenv";
import crypto from "crypto";

// Load environment variables for local testing
dotenv.config();

// 1. Initialize Clients
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for backend scripts to bypass RLS
);

async function generateBlog() {
  console.log("🚀 Starting AI Blog Generation...");

  try {
    // 2. Fetch existing categories from Supabase to provide as context
    const { data: categories, error: catError } = await supabase.from("categories").select("id, name");
    if (catError) throw new Error("Failed to fetch categories: " + catError.message);

    const categoryNames = categories.map(c => c.name).join(", ");
    
    // 3. Ask Gemini for a Blog Post
    console.log("🧠 Thinking of a topic and writing content...");
    const prompt = `You are an expert technical blogger. Write a highly engaging, SEO-optimized blog post about a trending software development, web development, or AI programming topic.
    
    Requirements:
    - Create a catchy title.
    - The slug should be url-friendly.
    - Write a compelling excerpt (max 160 chars).
    - Write the content using HTML tags (e.g., <h2>, <p>, <pre><code> for code blocks, <strong> for emphasis). Write a detailed, educational blog post (approx 500-600 words). Ensure you fully complete your response so the JSON is not cut off.
    - Provide SEO meta title (max 60 chars) and meta description (max 160 chars).
    - Provide 3-5 relevant tags.
    - Pick ONE of the following existing category names that best fits: ${categoryNames}.
    

    You MUST respond with ONLY a valid JSON object matching the following structure exactly (no markdown formatting, no code blocks):
    {
      "title": "...",
      "slug": "...",
      "excerpt": "...",
      "content": "...",
      "meta_title": "...",
      "meta_description": "...",
      "tags": ["..."],
      "selected_category_name": "..."
    }`;

    let responseContent;
    let retries = 3;
    while (retries > 0) {
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "qwen/qwen3.8-27b",
          temperature: 0.7,
          max_tokens: 950,
          response_format: { type: "json_object" },
        });
        
        responseContent = chatCompletion.choices[0].message.content;
        break; // Success! Break out of the loop
      } catch (err) {
        if ((err.status === 503 || err.status === 429 || err.status === 400) && retries > 1) {
          console.log(`⚠️ API busy or JSON truncated (Status ${err.status}). Retrying... (${retries - 1} attempts left)`);
          await new Promise(res => setTimeout(res, 5000));
          retries--;
        } else {
          throw err;
        }
      }
    }
    
    const blogData = JSON.parse(responseContent);
    console.log(`✅ Wrote blog: "${blogData.title}"`);

    // 4. Fetch Image via Unsplash
    console.log("📸 Fetching cover image from Unsplash...");
    // Use the first tag for the search query, fallback to "technology"
    const query = blogData.tags && blogData.tags.length > 0 ? blogData.tags[0] : "technology";
    
    const unsplashResponse = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)},coding&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    
    if (!unsplashResponse.ok) {
       console.error(await unsplashResponse.text());
       throw new Error("Failed to fetch image from Unsplash");
    }
    
    const unsplashData = await unsplashResponse.json();
    // Unsplash requires us to append width and height if we want a specific size.
    // The base url is in unsplashData.urls.raw
    const imageUrl = `${unsplashData.urls.raw}&w=1200&h=630&fit=crop`;
    
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error("Failed to download image from Unsplash URL");
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    
    // 5. Upload Image to Cloudflare R2
    console.log("☁️ Uploading image to Cloudflare R2...");
    const uniqueFilename = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}.jpg`;
    const key = `blogs/${uniqueFilename}`;

    await s3Client.send(new PutObjectCommand({
      Bucket: "devzone-portfolio",
      Key: key,
      Body: imageBuffer,
      ContentType: "image/jpeg"
    }));

    const rawDevUrl = process.env.NEXT_PUBLIC_R2_DEV_URL || "";
    const cleanDevUrl = rawDevUrl.replace(/^https?:\/\//, '');
    const publicUrl = `https://${cleanDevUrl}/${key}`;
    console.log(`✅ Image uploaded: ${publicUrl}`);

    // 6. Match Category ID
    const selectedCategory = categories.find(c => c.name.toLowerCase() === blogData.selected_category_name.toLowerCase());
    const categoryId = selectedCategory ? selectedCategory.id : null;

    // Calculate reading time (roughly 200 words per minute)
    const wordCount = blogData.content.replace(/<[^>]*>/g, "").trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // 7. Save to Supabase
    console.log("💾 Saving to database...");
    const { data: post, error: insertError } = await supabase.from("posts").insert({
      title: blogData.title,
      slug: blogData.slug,
      excerpt: blogData.excerpt,
      content: blogData.content,
      meta_title: blogData.meta_title,
      meta_description: blogData.meta_description,
      tags: blogData.tags,
      cover_image: publicUrl,
      og_image: publicUrl,
      reading_time: readingTime,
      published: true, // Auto-publish!
      published_at: new Date().toISOString()
    }).select("id").single();

    if (insertError) throw new Error("Failed to insert post: " + insertError.message);

    // Link category if found
    if (categoryId) {
      await supabase.from("post_categories").insert({
        post_id: post.id,
        category_id: categoryId
      });
    }

    console.log("🎉 ALL DONE! Automated blog posted successfully.");

  } catch (error) {
    console.error("❌ Automation Failed:", error);
    process.exit(1);
  }
}

generateBlog();
