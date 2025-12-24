import Image from "next/image";
import Link from "next/link";

export default function PrivacyPage() {
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
