import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "../lib/posts";
import { getPostContent } from "../lib/content";

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
    <main className="min-h-screen bg-paper">
      {/* Article Header */}
      <header className="pt-32 pb-12 px-6 md:px-12 border-b border-ink/10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-widest text-ink/40 hover:text-accent transition-colors mb-8 inline-block"
          >
            &larr; Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              {post.category}
            </span>
            <span className="w-1 h-1 bg-ink/30 rounded-full" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
              {post.readingTime}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            {post.title}
          </h1>

          <p className="font-sans text-lg text-ink/60 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-8 pt-6 border-t border-ink/10 flex items-center gap-4">
            <span className="font-mono text-xs text-ink/40">
              By {post.author}
            </span>
            <span className="w-1 h-1 bg-ink/20 rounded-full" />
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
      </header>

      {/* Article Content */}
      <article className="py-12 px-6 md:px-12">
        <div
          className="max-w-3xl mx-auto prose prose-lg prose-ink
          prose-headings:font-serif prose-headings:font-normal
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:font-sans prose-p:text-ink/70 prose-p:leading-relaxed
          prose-li:font-sans prose-li:text-ink/70
          prose-strong:text-ink prose-strong:font-semibold
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-ink/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-4">
            Ready to Elevate Your Game Night?
          </h2>
          <p className="font-sans text-ink/60 mb-8">
            The Arcadian table launches on Kickstarter March 2026. Join the
            waitlist for early-bird pricing.
          </p>
          <Link
            href="/#kickstarter"
            className="inline-block bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors rounded-full"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-12 px-6 md:px-12 border-t border-ink/10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="font-mono text-sm uppercase tracking-widest text-ink/40 hover:text-accent transition-colors"
          >
            &larr; More Articles
          </Link>
        </div>
      </section>
    </main>
  );
}
