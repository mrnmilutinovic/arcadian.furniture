"use server";

import { list } from "@vercel/blob";

export interface LogPhoto {
  url: string;
  pathname: string;
  uploadedAt: Date;
}

export interface GetLogPhotosResult {
  photos: LogPhoto[];
  cursor: string | null;
  hasMore: boolean;
}

const PHOTOS_PER_PAGE = 12;

export async function getLogPhotos(
  cursor?: string,
): Promise<GetLogPhotosResult> {
  const result = await list({
    prefix: "logs/",
    limit: PHOTOS_PER_PAGE,
    cursor: cursor,
  });

  const photos: LogPhoto[] = result.blobs
    .filter((blob) => /\.(jpe?g|png|webp|gif)$/i.test(blob.pathname))
    .map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      uploadedAt: blob.uploadedAt,
    }));

  return {
    photos,
    cursor: result.cursor ?? null,
    hasMore: result.hasMore,
  };
}
