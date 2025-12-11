"use client";

import Image from "next/image";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-paper/80 backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-ink transition-colors"
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
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>
        <Image
          src="/pan-logo.svg"
          alt="Arcadian Logo"
          width={40}
          height={40}
          className="w-10 h-10 absolute left-1/2 -translate-x-1/2"
        />
        <h1 className="font-mono text-xs uppercase tracking-widest text-ink/50">
          Terms & Conditions
        </h1>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-3xl mx-auto">
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
      <footer className="py-12 text-center border-t border-ink/10">
        <p className="font-mono text-xs text-ink/30 uppercase tracking-widest">
          © 2025 Arcadian. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
