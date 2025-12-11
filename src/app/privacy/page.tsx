"use client";

import Image from "next/image";
import Link from "next/link";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl mb-12">
          Privacy Policy
        </h1>

        <div className="prose prose-lg font-sans text-ink/70 space-y-8">
          <p className="text-sm font-mono text-ink/40 uppercase tracking-widest">
            Last updated: December 2024
          </p>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as your
              email address when you sign up for our mailing list. We may also
              collect usage data about how you interact with our website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                Send you updates about our Kickstarter campaign and product
                launches
              </li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              3. Information Sharing
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with service providers who
              assist us in operating our website and conducting our business,
              subject to confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              4. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              5. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Unsubscribe from our mailing list at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">6. Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience.
              You can configure your browser to refuse cookies, though this may
              affect some website functionality.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to
              exercise your rights, please contact us at
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
