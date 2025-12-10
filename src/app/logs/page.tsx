'use client';

import Image from 'next/image';
import Link from 'next/link';

const photos = [
  '/photos/preview-10.jpeg',
  '/photos/preview-11.jpeg',
  '/photos/preview-12.jpeg',
  '/photos/preview-13.jpeg',
  '/photos/preview-14.jpeg',
  '/photos/preview-15.jpeg',
  '/photos/preview-16.jpeg',
  '/photos/preview-17.jpeg',
  '/photos/assembly.jpeg',
  '/photos/close-up-1.jpeg',
  '/photos/close-up-2.jpeg',
  '/photos/close-up-rail-scene.jpg',
  '/photos/covered-scene.jpeg',
  '/photos/covered-scene-2.jpeg',
  '/photos/covered-scene-3.jpeg',
  '/photos/dark.jpeg',
  '/photos/light.jpeg',
  '/photos/dining-scene.jpeg',
  '/photos/size-big.jpeg',
  '/photos/size-big-2.jpeg',
  '/photos/size-small.jpeg',
  '/photos/uncovering-scene.jpeg',
  '/photos/uncovering-scene-2.jpeg',
];

export default function LogsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-4">
          {photos.map((src, index) => (
            <div
              key={src}
              className="mb-2 md:mb-4 break-inside-avoid group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={src}
                  alt={`Build log photo ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
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
