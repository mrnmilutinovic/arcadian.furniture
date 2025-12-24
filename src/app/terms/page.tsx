import Image from "next/image";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Navigation */}
      <nav className="w-full py-4 md:py-6 px-4 md:px-12 grid grid-cols-3 items-center fixed top-0 z-40 bg-paper">
        <Link
          href="/"
          className="font-mono text-[10px] md:text-xs uppercase tracking-widest hover:text-accent transition-colors"
        >
          <span className="hidden sm:inline">← Back to Home</span>
          <span className="sm:hidden">← Back</span>
        </Link>
        <Link href="/" className="justify-self-center">
          <Image
            src="/pan-logo.svg"
            alt="Arcadian Logo"
            width={60}
            height={60}
            className="w-10 h-10 md:w-12 md:h-12"
          />
        </Link>
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink/50 justify-self-end">
          Legal
        </div>
      </nav>

      {/* Content */}
      <main className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-12 max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl mb-12">
          Terms & Conditions
        </h1>

        <div className="prose prose-lg font-sans text-ink/70 space-y-8">
          <p className="text-sm font-mono text-ink/40 uppercase tracking-widest">
            Last updated: December 2024
          </p>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using the Arcadian website and services, you agree
              to be bound by these Terms and Conditions. If you do not agree to
              these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              2. Pre-Order & Kickstarter
            </h2>
            <p>
              Arcadian products will be available through our Kickstarter
              campaign launching in March 2026. By joining our mailing list, you
              are expressing interest and will receive updates about the
              campaign. No payment is required until the Kickstarter campaign is
              live.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              3. Product Information
            </h2>
            <p>
              We strive to provide accurate product descriptions, images, and
              specifications. However, as our products are in development, final
              specifications may vary. We will communicate any significant
              changes to backers before fulfillment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              4. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, images, logos, and
              designs, is the property of Arcadian and is protected by
              intellectual property laws. You may not reproduce, distribute, or
              create derivative works without our express permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              5. Limitation of Liability
            </h2>
            <p>
              Arcadian shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of our
              website or products. Our total liability shall not exceed the
              amount paid for the product in question.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              6. Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of Serbia, without regard to its conflict of law
              provisions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">7. Contact</h2>
            <p>
              For questions about these Terms & Conditions, please contact us at
              hello@arcadian.furniture
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-paper py-10 md:py-12 px-4 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <Link href="/" className="font-libre-baskerville text-3xl md:text-4xl">
            Arcadian
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-30 text-center">
            © 2025 Arcadian. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
