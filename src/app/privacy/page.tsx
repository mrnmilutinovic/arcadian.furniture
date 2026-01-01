import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Navigation */}
      <nav className="w-full py-4 md:py-6 px-4 md:px-12 flex justify-between items-start fixed top-0 z-40">
        <Link
          href="/"
          className="font-mono text-[10px] md:text-xs uppercase tracking-widest hover:text-accent transition-colors pt-2"
        >
          <span className="hidden sm:inline">← Back to Home</span>
          <span className="sm:hidden">← Back</span>
        </Link>
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center px-6 pb-4 pt-8 rounded-b-full"
          style={{ backgroundColor: "#181818" }}
        >
          <Image
            src="/new-logo.svg"
            alt="Arcadian Logo"
            width={60}
            height={60}
            className="w-10 h-10 md:w-12 md:h-12"
          />
        </Link>
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink/50 pt-2">
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
            Last updated: December 2025
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
              7. Unsubscribing from Our Newsletter
            </h2>
            <p>
              If you no longer wish to receive marketing emails from us, you can
              unsubscribe at any time using any of these methods:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                Click the &ldquo;Unsubscribe&rdquo; link at the bottom of any
                email we send you
              </li>
              <li>
                Email us directly at hello@arcadian.furniture with the subject
                line &ldquo;Unsubscribe&rdquo;
              </li>
            </ul>
            <p className="mt-4">
              Please allow up to 48 hours for your request to be processed. Note
              that even after unsubscribing from marketing emails, you may still
              receive transactional emails related to any orders or customer
              service inquiries.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to
              exercise your rights, please contact us at
              hello@arcadian.furniture
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
