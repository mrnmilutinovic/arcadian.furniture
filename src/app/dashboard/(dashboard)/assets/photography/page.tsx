import { list } from "@vercel/blob";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";

interface PhotoFile {
  url: string;
  pathname: string;
  uploadedAt: Date;
}

interface GalleryPhoto {
  name: string;
  thumbnailUrl: string;
  downloadUrl: string;
  uploadedAt: Date;
}

const PHOTO_PREFIX = "branding/photography/";
const THUMBS_PREFIX = "branding/photography/thumbs/";

function getName(pathname: string) {
  const name = pathname.split("/").pop();
  return name ?? pathname;
}

function getBaseName(pathname: string) {
  const name = getName(pathname);
  return name.replace(/\.[^.]+$/, "").toLowerCase();
}

export default async function PhotographyPage() {
  noStore();

  let photos: GalleryPhoto[] = [];
  let loadError = false;

  try {
    const result = await list({
      prefix: PHOTO_PREFIX,
      limit: 1000,
    });
    const allImageBlobs: PhotoFile[] = result.blobs
      .filter((blob) => /\.(jpe?g|png|webp|avif)$/i.test(blob.pathname))
      .map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        uploadedAt: blob.uploadedAt,
      }));

    const thumbnails = new Map(
      allImageBlobs
        .filter((blob) => blob.pathname.startsWith(THUMBS_PREFIX))
        .map((blob) => [getBaseName(blob.pathname), blob.url]),
    );

    photos = allImageBlobs
      .filter((blob) => !blob.pathname.startsWith(THUMBS_PREFIX))
      .map((blob) => {
        const name = getName(blob.pathname);
        return {
          name,
          thumbnailUrl: thumbnails.get(getBaseName(blob.pathname)) ?? blob.url,
          downloadUrl: blob.url,
          uploadedAt: blob.uploadedAt,
        };
      })
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  } catch {
    loadError = true;
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl tracking-wide text-[#f3f1ea]">
          Product Photography
        </h1>
        <p className="mt-1 text-sm text-[#d4c4a8]/40">
          High-res photos loaded from Vercel Blob (`branding/photography`).
        </p>
      </div>

      <div className="w-full rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6">
        {loadError ? (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-200/80">
            Could not load photos from Vercel Blob. Check blob access token and
            folder path `branding/photography/`.
          </div>
        ) : photos.length === 0 ? (
          <p className="text-sm text-[#d4c4a8]/40">No photos found yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {photos.map((photo) => (
              <a
                className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                download={photo.name}
                href={photo.downloadUrl}
                key={photo.downloadUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  alt={photo.name}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  src={photo.thumbnailUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="block truncate text-xs font-medium text-white">
                    {photo.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
