"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import {
  type GetLogPhotosResult,
  getLogPhotos,
  type LogPhoto,
} from "./actions";

interface PhotoGridProps {
  initialData: GetLogPhotosResult;
}

export function PhotoGrid({ initialData }: PhotoGridProps) {
  const [photos, setPhotos] = useState<LogPhoto[]>(initialData.photos);
  const [cursor, setCursor] = useState<string | null>(initialData.cursor);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
  const [isPending, startTransition] = useTransition();
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (!hasMore || isPending || !cursor) return;

    startTransition(async () => {
      const result = await getLogPhotos(cursor);
      setPhotos((prev) => [...prev, ...result.photos]);
      setCursor(result.cursor);
      setHasMore(result.hasMore);
    });
  }, [hasMore, isPending, cursor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore]);

  if (photos.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-mono text-sm text-white/50">No photos yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.url}
            className="mb-2 md:mb-4 break-inside-avoid group cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <Image
                src={photo.url}
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

      {hasMore && (
        <div ref={loaderRef} className="py-12 text-center">
          {isPending && (
            <div className="inline-block w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          )}
        </div>
      )}
    </>
  );
}
