import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "./lib/posts";

export const metadata: Metadata = {
  title: "Blog | Arcadian",
  description:
    "Expert guides on board game tables, gaming furniture, and creating the perfect game night. Tips from the craftsmen at Arcadian.",
  openGraph: {
    title: "Blog | Arcadian",
    description:
      "Expert guides on board game tables, gaming furniture, and creating the perfect game night.",
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-paper">
      {/* Header */}
      <header className="pt-32 pb-16 px-6 md:px-12 border-b border-ink/10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-ink/40 hover:text-accent transition-colors mb-8 inline-block"
          >
            &larr; Back to Home
          </Link>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">
            The <span className="italic text-ink/50">Workshop</span> Blog
          </h1>
          <p className="font-sans text-lg text-ink/60 max-w-2xl">
            Expert guides on board game tables, gaming furniture, and creating
            the perfect game night. From the craftsmen at Arcadian.
          </p>
        </div>
      </header>

      {/* Posts Grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-mono text-sm text-ink/40 uppercase tracking-widest mb-4">
                Coming Soon
              </p>
              <p className="font-sans text-ink/60">
                We&apos;re crafting our first articles. Check back soon.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group border-b border-ink/10 pb-12 last:border-0"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                        {post.category}
                      </span>
                      <span className="w-1 h-1 bg-ink/30 rounded-full" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="font-sans text-ink/60 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="font-mono text-xs uppercase tracking-widest text-ink/40 group-hover:text-accent transition-colors">
                      Read Article &rarr;
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
