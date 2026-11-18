import { cacheLife, cacheTag } from "next/cache";

import { PHOTOS_BLOB_URL } from "@/constants/photos";

/** One entry of `photos/<album>.json`, as the sync job writes it. */
type PublishedPhoto = {
  id: string;
  /** Camera-local time without a zone, e.g. 2026-11-15T21:33:28. */
  takenAt: string;
  /** Full-size JPEG, at most 1280px wide. */
  src: string;
  /** 240px square thumbnail. */
  thumb: string;
};

export type Photo = Omit<PublishedPhoto, "takenAt"> & {
  /** The day it was taken, e.g. "November 15, 2026". */
  takenOn: string;
};

const FETCH_TIMEOUT_MS = 5000;

const dayFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

/**
 * Checks one list entry and formats its date. The list is remote data, so anything malformed, or
 * pointing outside this album's folder on the store, is dropped rather than rendered.
 */
function toPhoto(entry: unknown, album: string): Photo | null {
  if (typeof entry !== "object" || entry === null) return null;
  const { id, takenAt, src, thumb } = entry as Partial<Record<keyof PublishedPhoto, unknown>>;
  const inAlbum = (url: unknown): url is string =>
    typeof url === "string" && url.startsWith(`${PHOTOS_BLOB_URL}/${album}/`);
  if (typeof id !== "string" || typeof takenAt !== "string" || !inAlbum(src) || !inAlbum(thumb)) {
    return null;
  }

  const taken = new Date(`${takenAt.replace(/Z$/, "")}Z`);
  if (Number.isNaN(taken.getTime())) return null;
  return { id, src, thumb, takenOn: dayFormat.format(taken) };
}

/** The newest `limit` photos of an Immich album, newest first, or none when the list can't be read. */
export async function getAlbumPhotos(album: string, limit: number): Promise<Photo[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`photos-${album}`);

  // Errors thrown inside a cached function fail the prerender even if the caller catches them.
  try {
    const response = await fetch(`${PHOTOS_BLOB_URL}/${album}.json`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`Blob responded ${response.status}`);
    const entries: unknown = await response.json();
    if (!Array.isArray(entries)) throw new Error("photo list is not an array");

    return entries
      .map((entry) => toPhoto(entry, album))
      .filter((photo) => photo !== null)
      .slice(0, limit);
  } catch (error) {
    console.error(`getAlbumPhotos: could not load the ${album} album`, error);
    return [];
  }
}
