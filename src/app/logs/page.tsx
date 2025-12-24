import Image from "next/image";
import Link from "next/link";
import { getLogPhotos } from "./actions";
import { PhotoGrid } from "./photo-grid";

export default async function LogsPage() {
  const initialData = await getLogPhotos();

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="w-full py-4 md:py-6 px-4 md:px-12 grid grid-cols-3 items-center fixed top-0 z-40 bg-black">
        <Link
          href="/"
          className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
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
            className="w-10 h-10 md:w-12 md:h-12 invert"
          />
        </Link>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 justify-self-end">
          Logs
        </div>
      </nav>

      {/* Masonry Grid */}
      <main className="pt-24 pb-12 px-2 md:px-4">
        <PhotoGrid initialData={initialData} />
      </main>

      {/* Footer */}
      <footer className="py-10 md:py-12 px-4 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <Link href="/" className="font-libre-baskerville text-3xl md:text-4xl text-white">
            Arcadian
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/30 text-center">
            © 2025 Arcadian. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
