"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${slug}/comments`)
      .then((r) => r.json())
      .then((data) => setComments(data.comments || []))
      .catch(() => {});
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: name,
          author_email: email,
          content,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setContent("");
      }
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h3 className="text-xl font-bold text-white mb-6">
        Comments ({comments.length})
      </h3>

      {/* Comment List */}
      {comments.length === 0 ? (
        <p className="text-white/40 mb-8">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-4 mb-8">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-sm font-bold">
                  {c.author_name.charAt(0)}
                </div>
                <span className="text-white font-medium">{c.author_name}</span>
                <span className="text-white/30 text-sm">
                  {new Date(c.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-white/70">{c.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment Form */}
      {submitted ? (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400">
          Thanks! Your comment is pending approval.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-red-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-red-500"
            />
          </div>
          <textarea
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-red-500 resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Post Comment"}
          </button>
        </form>
      )}
    </div>
  );
}
