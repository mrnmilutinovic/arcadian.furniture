import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Spirits of the Forest Meet the Arcadian Table | Arcadian",
  description:
    "We partnered with the creators of Forest of Radgost, a Slavic mythology board game, to showcase how epic adventures deserve an epic stage.",
};

export default function ForestOfRadgostArticle() {
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
              Collaboration
            </span>
            <span className="w-1 h-1 bg-ink/30 rounded-full" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
              December 2024
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-8">
            Spirits of the Forest Meet the{" "}
            <span className="italic text-ink/60">Arcadian Table</span>
          </h1>
          <p className="font-sans text-xl md:text-2xl text-ink/70 leading-relaxed max-w-3xl">
            When the creators of Forest of Radgost reached out, we knew this was
            the collaboration we&apos;d been waiting for. A game steeped in
            Slavic mythology, photographed on a table built for epic adventures.
          </p>
        </div>
      </header>

      {/* Featured Image */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-[21/9] relative bg-ink/5 overflow-hidden">
            <Image
              src="/photos/forest-of-radgost.jpg"
              alt="Forest of Radgost board game on the Arcadian table"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="font-mono text-[10px] text-ink/40 mt-4 text-center uppercase tracking-widest">
            Forest of Radgost set up on the Arcadian Grand in Pan&apos;s Shadow
            finish
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-ink mb-8">
              Forest of Radgost is more than a board game—it&apos;s a journey
              into the heart of Slavic folklore, where ancient spirits guard
              sacred groves and every decision carries the weight of legend.
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mt-16 mb-6">
              A Meeting of Crafts
            </h2>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              The team behind Forest of Radgost shares our obsession with
              quality and authenticity. Their game components are works of art:
              hand-illustrated cards depicting Slavic deities, wooden tokens
              carved with ancient symbols, and a board that unfolds like a map
              to another world.
            </p>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              When they approached us about featuring their game on the
              Arcadian, we immediately understood the synergy. Both our products
              are designed for people who believe that the vessel matters as
              much as what it contains.
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mt-16 mb-6">
              The Photoshoot
            </h2>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              Professional photographer Boris Jovanovic—whose work has graced
              campaigns for Netflix and Adidas—captured the collaboration over
              two intensive days in our workshop. The goal: show how a premium
              gaming table transforms not just the space, but the entire
              experience.
            </p>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              The deep vault of the Arcadian became the perfect stage for the
              game&apos;s sprawling setup. Miniatures stood proud against the
              felt-lined surface, cards arranged with room to spare, and the oak
              rails held drinks safely away from the action.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4 my-16">
            <div className="aspect-square relative bg-ink/5">
              <Image
                src="/photos/forest-of-radgost-detail-1.jpg"
                alt="Game detail shot"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-square relative bg-ink/5">
              <Image
                src="/photos/forest-of-radgost-detail-2.jpg"
                alt="Table detail with game components"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="prose prose-lg">
            <h2 className="font-serif text-3xl md:text-4xl mt-16 mb-6">
              What We Learned
            </h2>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              Collaborating with passionate creators always teaches us
              something. The Forest of Radgost team helped us see our table
              through fresh eyes—not just as furniture, but as a portal to other
              worlds.
            </p>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-6">
              We&apos;re proud to have our work associated with theirs, and we
              can&apos;t wait to see what other adventures unfold on Arcadian
              tables around the world.
            </p>

            <div className="border-t border-ink/10 mt-16 pt-8">
              <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-4">
                About Forest of Radgost
              </p>
              <p className="font-sans text-sm text-ink/60 leading-relaxed">
                Forest of Radgost is a cooperative adventure game for 1-4
                players, set in the mystical forests of Slavic mythology.
                Players take on the roles of spirits protecting sacred groves
                from encroaching darkness. The game features stunning artwork,
                premium components, and deep strategic gameplay that unfolds
                over multiple sessions.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Next Article CTA */}
      <section className="bg-ink text-paper py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 block mb-4">
            Next Story
          </span>
          <Link
            href="/stories/boris-jovanovic-photoshoot"
            className="group block"
          >
            <h3 className="font-serif text-3xl md:text-4xl group-hover:text-accent transition-colors mb-4">
              Behind the Lens with Boris Jovanovic
            </h3>
            <p className="font-sans text-lg text-paper/60 mb-4">
              Netflix and Adidas photographer Boris Jovanovic captured the soul
              of the Arcadian table in our most ambitious photoshoot yet.
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
