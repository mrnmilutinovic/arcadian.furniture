import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { Footer } from "@/app/components/Footer";
import { getPostContent } from "../lib/content";
import { getAllSlugs, getPostBySlug } from "../lib/posts";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
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
    alternates: {
      canonical: `/blog/${slug}`,
    },
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
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = getPostContent(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://www.arcadiantables.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Arcadian",
      logo: {
        "@type": "ImageObject",
        url: "https://www.arcadiantables.com/new-logo.svg",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.arcadiantables.com/blog/${slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <main className="min-h-screen bg-paper">
        {/* Article Header */}
        <header className="pt-28 md:pt-36 pb-16 px-6 md:px-12 bg-[#F3F1EA]">
          <div className="max-w-3xl mx-auto">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />

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
    </>
  );
}
