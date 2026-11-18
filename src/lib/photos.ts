import { cacheLife, cacheTag } from "next/cache";

import { PHOTOS_BLOB_URL } from "@/constants/photos";

export type Photo = {
  id: string;
  /** Full-size JPEG, at most 1280px wide. */
  src: string;
  /** 240px square thumbnail. */
  thumb: string;
  /** The day it was taken, e.g. "November 15, 2026". */
  takenOn: string;
};

const FETCH_TIMEOUT_MS = 5000;
/** The list is a few hundred bytes per photo; anything near this is not a list the sync job wrote. */
const MAX_LIST_BYTES = 256 * 1024;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
/** Camera-local time without a zone, as the sync job writes it, e.g. 2026-11-15T21:33:28. */
const LOCAL_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

const dayFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

/**
 * Checks one list entry and formats its date. The list is remote data, so an entry is kept only if
 * its URLs are exactly the two files the sync job writes for that id in this album.
 */
function toPhoto(entry: unknown, album: string): Photo | null {
  if (typeof entry !== "object" || entry === null) return null;
  const { id, takenAt, src, thumb } = entry as Record<string, unknown>;
  if (typeof id !== "string" || !UUID.test(id)) return null;
  if (typeof takenAt !== "string" || !LOCAL_TIMESTAMP.test(takenAt)) return null;

  const base = `${PHOTOS_BLOB_URL}/${album}/${id}`;
  if (src !== `${base}.jpg` || thumb !== `${base}-thumb.jpg`) return null;

  // The camera's local time, read as UTC and formatted in UTC, keeps the day it was taken.
  const taken = new Date(`${takenAt}Z`);
  if (Number.isNaN(taken.getTime())) return null;
  return { id, src, thumb, takenOn: dayFormat.format(taken) };
}

/** The first `limit` valid photos of an album, newest first, or none when the list can't be read. */
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
    if (Number(response.headers.get("content-length") ?? 0) > MAX_LIST_BYTES) {
      throw new Error("photo list is too large");
    }
    const body = await response.text();
    if (body.length > MAX_LIST_BYTES) throw new Error("photo list is too large");
    const entries: unknown = JSON.parse(body);
    if (!Array.isArray(entries)) throw new Error("photo list is not an array");

    const photos: Photo[] = [];
    const seen = new Set<string>();
    let dropped = 0;
    for (const entry of entries) {
      const photo = toPhoto(entry, album);
      if (!photo || seen.has(photo.id)) {
        dropped += 1;
        continue;
      }
      seen.add(photo.id);
      photos.push(photo);
      if (photos.length === limit) break;
    }
    if (dropped > 0) console.warn(`getAlbumPhotos: dropped ${dropped} invalid ${album} entries`);
    return photos;
  } catch (error) {
    console.error(`getAlbumPhotos: could not load the ${album} album`, error);
    return [];
  }
}
