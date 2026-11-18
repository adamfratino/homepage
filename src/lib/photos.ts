import { cacheLife, cacheTag } from "next/cache";

import { PHOTOS_BLOB_URL } from "@/constants/photos";

/** One published photo, as listed in `photos/<album>.json` by the NAS photosync container. */
export type Photo = {
  id: string;
  /** Camera-local time without a zone, e.g. 2026-11-15T21:33:28. */
  takenAt: string;
  /** Full-size JPEG, at most 1280px wide. */
  src: string;
  /** 240px square thumbnail. */
  thumb: string;
};

/** The newest `limit` photos of an Immich album, newest first, or none when the list can't be read. */
export async function getAlbumPhotos(album: string, limit: number): Promise<Photo[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`photos-${album}`);

  // Errors thrown inside a cached function fail the prerender even if the caller catches them.
  try {
    const response = await fetch(`${PHOTOS_BLOB_URL}/${album}.json`);
    if (!response.ok) throw new Error(`Blob responded ${response.status}`);
    const photos = (await response.json()) as Photo[];
    return photos.slice(0, limit);
  } catch (error) {
    console.error(`getAlbumPhotos: could not load the ${album} album`, error);
    return [];
  }
}
