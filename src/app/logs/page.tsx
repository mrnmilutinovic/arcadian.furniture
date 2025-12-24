import Image from "next/image";
import Link from "next/link";
import { getLogPhotos } from "./actions";
import { PhotoGrid } from "./photo-grid";

export default async function LogsPage() {
  const initialData = await getLogPhotos();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
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
          className="w-10 h-10 invert absolute left-1/2 -translate-x-1/2"
        />
        <h1 className="font-mono text-xs uppercase tracking-widest text-white/50">
          Logs
        </h1>
      </header>

      {/* Masonry Grid */}
      <main className="pt-24 pb-12 px-2 md:px-4">
        <PhotoGrid initialData={initialData} />
      </main>

      {/* Footer */}
      <footer className="py-12 text-center">
        <p className="font-mono text-xs text-white/30 uppercase tracking-widest">
          More photos coming soon
        </p>
      </footer>
    </div>
  );
}
