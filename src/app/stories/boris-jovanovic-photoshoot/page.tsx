import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Behind the Lens with Boris Jovanovic | Arcadian",
  description:
    "Netflix and Adidas photographer Boris Jovanovic captured the soul of the Arcadian table in our most ambitious photoshoot yet.",
};

export default function BorisJovanovicArticle() {
  return (
    <>
      {/* Navigation */}
      <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-center fixed top-0 z-40 bg-paper/90 backdrop-blur-sm">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors"
        >
          ← Back to Home
        </Link>
        <Link href="/">
          <Image
            src="/pan-logo.svg"
            alt="Arcadian Logo"
            width={60}
            height={60}
            className="w-12 h-12"
          />
        </Link>
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
          Stories
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Behind the Scenes
            </span>
            <span className="w-1 h-1 bg-ink/30 rounded-full" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
              December 2024
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-8">
            Behind the Lens with{" "}
            <span className="italic text-ink/60">Boris Jovanovic</span>
          </h1>
          <p className="font-sans text-xl md:text-2xl text-ink/70 leading-relaxed max-w-3xl">
            When you want to capture something special, you call someone who
            sees the world differently. Boris Jovanovic has shot for Netflix,
            Adidas, and now—Arcadian.
          </p>
        </div>
      </header>

      {/* Featured Image */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-[21/9] relative bg-ink/5 overflow-hidden">
            <Image
              src="/photos/boris-photoshoot.jpg"
              alt="Boris Jovanovic during the Arcadian photoshoot"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="font-mono text-[10px] text-ink/40 mt-4 text-center uppercase tracking-widest">
            Boris Jovanovic at work in the Arcadian workshop
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-ink mb-8">
              Great photography isn&apos;t about the camera—it&apos;s about the
              eye behind it. Boris Jovanovic has spent years honing that eye on
              sets for some of the world&apos;s most demanding brands.
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mt-16 mb-6">
              The Right Collaborator
            </h2>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              We&apos;d admired Boris&apos;s work for years. His portfolio reads
              like a who&apos;s who of modern visual culture: Netflix
              productions, Adidas campaigns, editorial spreads for international
              publications. But what drew us to him wasn&apos;t the big names—it
              was his ability to find soul in objects.
            </p>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              When we reached out about photographing the Arcadian table, he
              didn&apos;t just say yes. He came to the workshop, ran his hands
              over the wood, asked about our finishing process, and spent an
              hour talking about the games he plays with his children.
            </p>

            <blockquote className="border-l-4 border-accent pl-6 my-12">
              <p className="font-serif text-2xl md:text-3xl italic text-ink/80 leading-relaxed">
                &ldquo;A gaming table isn&apos;t furniture. It&apos;s where
                stories happen. That&apos;s what I wanted to capture.&rdquo;
              </p>
              <cite className="font-mono text-xs uppercase tracking-widest text-ink/40 mt-4 block not-italic">
                — Boris Jovanovic
              </cite>
            </blockquote>

            <h2 className="font-serif text-3xl md:text-4xl mt-16 mb-6">
              Two Days of Magic
            </h2>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              The shoot took place over two intensive days in December. We
              transformed our workshop into a studio, bringing in the Forest of
              Radgost team to set up their stunning board game as our hero
              subject.
            </p>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              Boris worked with natural light when he could, augmenting with
              subtle fills to bring out the depth of the oak grain and the
              warmth of our Pan&apos;s Shadow finish. He photographed every
              angle, every detail—from the magnetic rail system to the felt-
              lined vault, from the precision joinery to the game pieces
              scattered mid-play.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4 my-16">
            <div className="aspect-square relative bg-ink/5">
              <Image
                src="/photos/boris-detail-1.jpg"
                alt="Behind the scenes detail"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-square relative bg-ink/5">
              <Image
                src="/photos/boris-detail-2.jpg"
                alt="Lighting setup"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="prose prose-lg">
            <h2 className="font-serif text-3xl md:text-4xl mt-16 mb-6">
              More Than Product Shots
            </h2>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              What Boris delivered wasn&apos;t a collection of product
              photographs. It was a visual story—images that capture not just
              what the Arcadian table looks like, but what it feels like to
              gather around one.
            </p>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              You can see hands reaching for game pieces, the warm glow of
              afternoon light on oak, the intimate geometry of friends leaning
              in for a closer look at the board. These are the moments we built
              this table for, and Boris caught them perfectly.
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mt-16 mb-6">
              The Results
            </h2>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              The images from this shoot form the visual backbone of everything
              you see on this website. They&apos;ll appear in our Kickstarter
              campaign, our social media, and everywhere we tell the Arcadian
              story.
            </p>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              We&apos;re grateful to Boris for bringing his vision to our
              project, and to the Forest of Radgost team for trusting us with
              their beautiful game. Collaborations like these remind us why we
              do what we do.
            </p>

            <div className="border-t border-ink/10 mt-16 pt-8">
              <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-4">
                About Boris Jovanovic
              </p>
              <p className="font-sans text-sm text-ink/60 leading-relaxed">
                Boris Jovanovic is a professional photographer based in Serbia
                with over a decade of experience in commercial and editorial
                photography. His client list includes Netflix, Adidas, and
                numerous international publications. When not behind the camera,
                he can be found playing board games with his family—often on
                whatever interesting table he can find.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Next Article CTA */}
      <section className="bg-ink text-paper py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 block mb-4">
            Previous Story
          </span>
          <Link
            href="/stories/forest-of-radgost-collaboration"
            className="group block"
          >
            <h3 className="font-serif text-3xl md:text-4xl group-hover:text-accent transition-colors mb-4">
              Spirits of the Forest Meet the Arcadian Table
            </h3>
            <p className="font-sans text-lg text-paper/60 mb-4">
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

      {/* Footer */}
      <footer className="bg-black text-paper py-12 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="font-ruthie text-4xl">
            Arcadian
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-30">
            © 2025 Arcadian. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
