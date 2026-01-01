import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { getLogPhotos } from "./actions";
import { PhotoGrid } from "./photo-grid";

// Force dynamic rendering - always fetch fresh data from blob storage
export const dynamic = "force-dynamic";

export default async function LogsPage() {
  const initialData = await getLogPhotos();

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="w-full py-4 md:py-6 px-4 md:px-12 flex justify-between items-start fixed top-0 z-40">
        <Link
          href="/"
          className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors pt-2"
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
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 pt-2">
          Logs
        </div>
      </nav>

      {/* Masonry Grid */}
      <main className="pt-24 pb-12 px-2 md:px-4">
        <PhotoGrid initialData={initialData} />
      </main>

      <Footer />
    </div>
  );
}
