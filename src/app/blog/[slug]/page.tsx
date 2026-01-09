import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "../lib/posts";
import { getPostContent } from "../lib/content";
import { Footer } from "@/app/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Arcadian" };
  }

  return {
    title: `${post.title} | Arcadian Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = getPostContent(slug);

  return (
    <>
      <main className="min-h-screen bg-paper">
        {/* Article Header */}
        <header className="pt-32 pb-16 px-6 md:px-12 bg-[#F3F1EA]">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-widest text-ink/40 hover:text-accent transition-colors mb-12 inline-flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
                {post.readingTime}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 text-ink">
              {post.title}
            </h1>

            <p className="font-sans text-xl text-ink/60 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>

            <div className="mt-12 pt-8 border-t border-ink/10 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center">
                  <span className="font-serif text-lg text-ink/60">A</span>
                </div>
                <div>
                  <span className="font-sans text-sm text-ink block">
                    {post.author}
                  </span>
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs text-ink/40"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-16 md:py-24 px-6 md:px-12">
          <div
            className="max-w-3xl mx-auto blog-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 bg-[#F3F1EA]">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-4">
              Join the Movement
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Ready to Elevate Your Game Night?
            </h2>
            <p className="font-sans text-lg text-ink/60 mb-10 max-w-xl mx-auto">
              The Arcadian table launches on Kickstarter March 2026. Join the
              waitlist for early-bird pricing and exclusive updates.
            </p>
            <Link
              href="/"
              className="inline-block bg-ink text-paper px-10 py-5 font-mono text-sm uppercase tracking-widest hover:bg-accent transition-colors rounded-full"
            >
              Join the Waitlist
            </Link>
          </div>
        </section>

        {/* More Articles */}
        <section className="py-16 px-6 md:px-12 border-t border-ink/10">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <Link
              href="/blog"
              className="font-mono text-sm uppercase tracking-widest text-ink/40 hover:text-accent transition-colors inline-flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              More Articles
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .blog-content {
          font-family: var(--font-sans);
          color: rgba(24, 24, 24, 0.8);
          font-size: 1.125rem;
          line-height: 1.8;
        }

        .blog-content p {
          margin-bottom: 1.75rem;
        }

        .blog-content h2 {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 400;
          color: #181818;
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .blog-content h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: #181818;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.75rem;
          padding-left: 1.5rem;
        }

        .blog-content ul {
          list-style-type: disc;
        }

        .blog-content ol {
          list-style-type: decimal;
        }

        .blog-content li {
          margin-bottom: 0.75rem;
          padding-left: 0.5rem;
        }

        .blog-content li::marker {
          color: rgba(24, 24, 24, 0.3);
        }

        .blog-content strong {
          font-weight: 600;
          color: #181818;
        }

        .blog-content a {
          color: var(--color-accent);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }

        .blog-content a:hover {
          border-bottom-color: var(--color-accent);
        }

        .blog-content hr {
          border: none;
          border-top: 1px solid rgba(24, 24, 24, 0.1);
          margin: 3rem 0;
        }

        .blog-content em {
          font-style: italic;
        }

        .blog-content blockquote {
          border-left: 3px solid var(--color-accent);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: rgba(24, 24, 24, 0.7);
        }

        .blog-content p:first-of-type {
          font-size: 1.25rem;
          color: rgba(24, 24, 24, 0.7);
        }

        @media (min-width: 768px) {
          .blog-content {
            font-size: 1.1875rem;
          }

          .blog-content h2 {
            font-size: 2.25rem;
          }

          .blog-content h3 {
            font-size: 1.625rem;
          }
        }
      `}</style>
    </>
  );
}
