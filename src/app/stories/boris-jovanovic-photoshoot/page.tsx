import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Behind the Lens with Boris Jovanovic | Arcadian",
  description:
    "Netflix and Adidas photographer Boris Jovanovic captured the soul of the Arcadian table in our most ambitious photoshoot yet.",
  alternates: {
    canonical: "/stories/boris-jovanovic-photoshoot",
  },
  openGraph: {
    title: "Behind the Lens with Boris Jovanovic | Arcadian",
    description:
      "Netflix and Adidas photographer Boris Jovanovic captured the soul of the Arcadian table in our most ambitious photoshoot yet.",
    type: "article",
    images: [
      {
        url: "/photos/boris-photo-2.jpeg",
        width: 1200,
        height: 630,
        alt: "Boris Jovanovic during the Arcadian photoshoot",
      },
    ],
  },
};

export default function BorisJovanovicArticle() {
  return (
    <>
      {/* Hero */}
      <header className="pt-28 md:pt-36 pb-12 md:pb-16 px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Stories", href: "/#stories" },
              { label: "Boris Jovanovic" },
            ]}
          />
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Behind the Scenes
            </span>
            <span className="w-1 h-1 bg-ink/30 rounded-full" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
              September 2025
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl leading-tight mb-6 md:mb-8">
            Behind the Lens with{" "}
            <span className="italic text-ink/60">Boris Jovanovic</span>
          </h1>
          <p className="font-sans text-lg md:text-2xl text-ink/70 leading-relaxed max-w-3xl">
            When you want to capture something special, you call someone who
            sees the world differently. Boris Jovanovic has shot for Netflix,
            Adidas, and many more brands you love.
          </p>
        </div>
      </header>

      {/* Featured Image */}
      <section className="px-4 md:px-12 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-[4/3] md:aspect-[21/9] relative overflow-hidden">
            <Image
              src="/photos/boris-photo-2.jpeg"
              alt="Boris Jovanovic during the Arcadian photoshoot"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <p className="font-mono text-[10px] text-ink/40 mt-4 text-center uppercase tracking-widest">
            Boris Jovanovic at the Arcadian photoshoot
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-4 md:px-12 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-ink mb-8">
              Great photography isn&apos;t about the camera - it&apos;s about
              the eye behind it. Boris Jovanovic has spent years honing that eye
              on sets for some of the world&apos;s most demanding brands.
            </p>

            <h2 className="font-serif text-2xl md:text-4xl mt-10 md:mt-16 mb-4 md:mb-6">
              The Right Collaborator
            </h2>
            <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed mb-6">
              We&apos;d admired Boris&apos;s work for years. His portfolio reads
              like a who&apos;s who of modern visual culture: Netflix
              productions, Adidas campaigns, editorial spreads for international
              publications. But what drew us to him wasn&apos;t the big names—it
              was his ability to find soul in objects.
            </p>

            <blockquote className="border-l-4 border-accent pl-4 md:pl-6 my-8 md:my-12">
              <p className="font-serif text-xl md:text-3xl italic text-ink/80 leading-relaxed">
                &ldquo;A gaming table isn&apos;t furniture. It&apos;s where
                stories happen. That&apos;s what I wanted to capture.&rdquo;
              </p>
              <cite className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-ink/40 mt-3 md:mt-4 block not-italic">
                — Boris Jovanovic
              </cite>
            </blockquote>

            <h2 className="font-serif text-2xl md:text-4xl mt-10 md:mt-16 mb-4 md:mb-6">
              Two Days of Magic
            </h2>
            <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed mb-6">
              The shoot took place over two intensive days in September. We
              rented and transformed one of the places we really liked into a
              studio, bringing in the Forest of Radgost team to set up their
              stunning board game as our hero subject.
            </p>
            <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed mb-6">
              Boris worked with natural light when he could, augmenting with
              subtle fills to bring out the depth of the oak grain and the
              warmth of our Pan&apos;s Shadow finish. He photographed every
              angle, every detail—from the magnetic rail system to the felt-
              lined vault, from the precision joinery to the game pieces
              scattered mid-play.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-2 md:gap-4 my-10 md:my-16">
            <div className="aspect-[4/5] relative bg-ink/5">
              <Image
                src="/photos/boris-photo-3.jpeg"
                alt="Behind the scenes detail"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="aspect-[4/5] relative bg-ink/5">
              <Image
                src="/photos/boris-photo-4.jpeg"
                alt="Lighting setup"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="prose prose-lg">
            <h2 className="font-serif text-2xl md:text-4xl mt-10 md:mt-16 mb-4 md:mb-6">
              More Than Product Shots
            </h2>
            <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed mb-6">
              What Boris delivered wasn&apos;t a collection of product
              photographs. It was a visual story—images that capture not just
              what the Arcadian table looks like, but what it feels like to
              gather around one.
            </p>
            <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed mb-6">
              You can see hands reaching for game pieces, the warm glow of
              afternoon light on oak, the intimate geometry of friends leaning
              in for a closer look at the board. These are the moments we built
              this table for, and Boris caught them perfectly.
            </p>

            <h2 className="font-serif text-2xl md:text-4xl mt-10 md:mt-16 mb-4 md:mb-6">
              The Results
            </h2>
            <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed mb-6">
              The images from this shoot form the visual backbone of everything
              you see on this website. They&apos;ll appear in our Kickstarter
              campaign, our social media, and everywhere we tell the Arcadian
              story.
            </p>
            <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed mb-6">
              We&apos;re grateful to Boris for bringing his vision to our
              project, and to the Forest of Radgost team for trusting us with
              their beautiful game. Collaborations like these remind us why we
              do what we do.
            </p>
          </div>

          {/* Polaroid Photo Row */}
          <div className="my-16 -mx-6 md:mx-0">
            <div className="flex md:justify-center overflow-x-auto md:overflow-visible px-6 md:px-0 pb-4 md:pb-0 scrollbar-hide overscroll-x-contain touch-pan-x">
              <div className="flex -space-x-4 md:-space-x-12 shrink-0">
                <div className="bg-white p-2 md:p-3 pb-8 md:pb-12 shadow-lg rotate-[-4deg] hover:rotate-0 hover:scale-105 hover:z-10 transition-all duration-300 relative shrink-0">
                  <div className="w-32 h-32 md:w-64 md:h-64 relative">
                    <Image
                      src="/photos/preview-10.jpeg"
                      alt="Arcadian table in elegant dining room setting"
                      fill
                      sizes="(max-width: 768px) 128px, 256px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="bg-white p-2 md:p-3 pb-8 md:pb-12 shadow-lg rotate-[2deg] hover:rotate-0 hover:scale-105 hover:z-10 transition-all duration-300 relative shrink-0">
                  <div className="w-32 h-32 md:w-64 md:h-64 relative">
                    <Image
                      src="/photos/preview-11.jpeg"
                      alt="Handcrafted oak corner detail of Arcadian table"
                      fill
                      sizes="(max-width: 768px) 128px, 256px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="bg-white p-2 md:p-3 pb-8 md:pb-12 shadow-lg rotate-[-2deg] hover:rotate-0 hover:scale-105 hover:z-10 transition-all duration-300 relative z-[5] shrink-0">
                  <div className="w-32 h-32 md:w-64 md:h-64 relative">
                    <Image
                      src="/photos/preview-12.jpeg"
                      alt="Magnetic accessory rail mounted on table edge"
                      fill
                      sizes="(max-width: 768px) 128px, 256px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="bg-white p-2 md:p-3 pb-8 md:pb-12 shadow-lg rotate-[3deg] hover:rotate-0 hover:scale-105 hover:z-10 transition-all duration-300 relative shrink-0">
                  <div className="w-32 h-32 md:w-64 md:h-64 relative">
                    <Image
                      src="/photos/preview-13.jpeg"
                      alt="Recessed vault area with gaming accessories"
                      fill
                      sizes="(max-width: 768px) 128px, 256px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="bg-white p-2 md:p-3 pb-8 md:pb-12 shadow-lg rotate-[-1deg] hover:rotate-0 hover:scale-105 hover:z-10 transition-all duration-300 relative shrink-0">
                  <div className="w-32 h-32 md:w-64 md:h-64 relative">
                    <Image
                      src="/photos/preview-14.jpeg"
                      alt="Solid oak table leg with premium finish"
                      fill
                      sizes="(max-width: 768px) 128px, 256px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="prose prose-lg">
            <div className="border-t border-ink/10 mt-16 pt-8">
              <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-4">
                About Boris Jovanovic
              </p>
              <p className="font-sans text-sm text-ink/60 leading-relaxed mb-6">
                Boris Jovanovic is a professional photographer based in Serbia
                with over a decade of experience in commercial and editorial
                photography. His client list includes Netflix, Adidas, and
                numerous international publications.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://borisjovanovic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-accent transition-colors"
                >
                  Website
                </a>
                <a
                  href="https://www.instagram.com/borisjovanovic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-accent transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.stocksy.com/borisjovanovic/showcase?page=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-accent transition-colors"
                >
                  Stocksy
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Next Article CTA */}
      <section className="bg-ink text-paper py-12 md:py-20 px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 block mb-3 md:mb-4">
            Previous Story
          </span>
          <Link
            href="/stories/forest-of-radgost-collaboration"
            className="group block"
          >
            <h3 className="font-serif text-2xl md:text-4xl group-hover:text-accent transition-colors mb-3 md:mb-4">
              Spirits of the Forest Meet the Arcadian Table
            </h3>
            <p className="font-sans text-base md:text-lg text-paper/60 mb-3 md:mb-4">
              We partnered with the creators of Forest of Radgost, a Slavic
              mythology board game, to showcase how epic adventures deserve an
              epic stage.
            </p>
            <span className="font-mono text-xs uppercase tracking-widest text-paper/40 group-hover:text-accent transition-colors">
              Read Story →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
