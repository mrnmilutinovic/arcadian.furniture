import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Footer } from "../components/Footer";

const faqs = [
  {
    question: "How much does an Arcadian table cost?",
    answer:
      "Pricing will be announced when our 2026 batch opens. Early supporters will receive exclusive pricing. Join our waitlist to be notified first.",
  },
  {
    question: "What sizes are available?",
    answer:
      "We offer two sizes: The Standard (108×108cm, seats 4) and The Grand (108×189cm, seats 6-8). Both feature a 10cm deep recessed vault for gaming.",
  },
  {
    question: "What wood is the table made from?",
    answer:
      "Arcadian tables are crafted from solid European oak. We offer two finish options: Arcadian Dawn (natural light oak) and Pan's Shadow (rich walnut tones). A mystery third finish will be revealed exclusively to 2026 batch supporters.",
  },
  {
    question: "How long does assembly take?",
    answer:
      "About 30 minutes. The table arrives flat-packed with pre-drilled holes and requires only a single tool. No guesswork, no leftover screws.",
  },
  {
    question: "Will it fit through my door?",
    answer:
      "Yes. Both sizes are designed to fit through standard doorways when flat-packed. Both The Standard and The Grand fit easily.",
  },
  {
    question: "What is the recessed vault?",
    answer:
      "The vault is a 10cm deep play area beneath the table surface. It keeps game components secure, allows you to leave games set up between sessions, and transforms into a dining table when the toppers are placed on top.",
  },
  {
    question: "How do the toppers work?",
    answer:
      "The toppers are precision-sized solid oak panels that rest on the table frame, covering the vault. They're heavy enough to stay put during meals but light enough for easy one-hand removal when it's game time.",
  },
  {
    question: "What is the magnetic rail system?",
    answer:
      "The rail system runs along the inner perimeter of the vault. Accessories like cup holders, dice trays, and component bins snap into place with industrial-strength magnets—no screws required. Position them anywhere along the rail.",
  },
  {
    question: "What finish is used on the wood?",
    answer:
      "We use a plant-based hardwax oil that's 0% VOC and solvent-free. It penetrates the wood fibers for outstanding resistance to wear, water, and heat while preserving the natural look and feel of the oak.",
  },
  {
    question: "When will my table ship?",
    answer:
      "The 2026 batch is estimated to ship in Q4 2026. We'll provide regular updates to all supporters throughout the production process.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Shipping details will be announced with our 2026 batch opening. Join the waitlist to receive updates on shipping availability to your region.",
  },
  {
    question: "What's included with the table?",
    answer:
      "Every Arcadian table includes the table frame, legs, topper panels, and assembly hardware. Accessories like cup holders and dice trays are available separately.",
  },
  {
    question: "How durable is the table?",
    answer:
      "Built to last generations. Solid oak construction, traditional joinery techniques, and a protective hardwax finish ensure your table can handle decades of game nights, family dinners, and daily use.",
  },
  {
    question: "Can I see the table in person?",
    answer:
      "We occasionally attend board game conventions and events. Follow us on Instagram (@arcadiantables) for announcements about where you can see and experience the Arcadian table.",
  },
];

// Generate FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Arcadian Board Game Tables",
  description:
    "Get answers about Arcadian board game tables: pricing, sizes, assembly, wood finishes, the vault system, shipping, and more.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Arcadian Board Game Tables",
    description:
      "Get answers about Arcadian board game tables: pricing, sizes, assembly, wood finishes, the vault system, shipping, and more.",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="min-h-screen bg-paper">
        {/* Header */}
        <header className="pt-28 md:pt-36 pb-16 px-6 md:px-12 bg-[#F3F1EA]">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "FAQ" },
              ]}
            />
            <h1 className="font-serif text-5xl md:text-7xl mb-6">
              Frequently Asked{" "}
              <span className="italic text-ink/50">Questions</span>
            </h1>
            <p className="font-sans text-xl text-ink/60 max-w-2xl">
              Everything you need to know about the Arcadian table, from sizing
              to finishes to how the vault works.
            </p>
          </div>
        </header>

        {/* FAQ List */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-0 divide-y divide-ink/10">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group py-6 first:pt-0 last:pb-0"
                >
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <h2 className="font-serif text-xl md:text-2xl pr-8 group-hover:text-accent transition-colors">
                      {faq.question}
                    </h2>
                    <span className="shrink-0 w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center group-open:rotate-45 transition-transform">
                      <svg
                        className="w-4 h-4 text-ink/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="font-sans text-ink/70 leading-relaxed mt-4 pr-16">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-[#F3F1EA]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Still have questions?
            </h2>
            <p className="font-sans text-lg text-ink/60 mb-8">
              Reach out to us directly and we&apos;ll get back to you.
            </p>
            <a
              href="mailto:hello@arcadiantables.com"
              className="inline-block bg-ink text-paper px-10 py-5 font-mono text-sm uppercase tracking-widest hover:bg-accent transition-colors rounded-full"
            >
              Contact Us
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
