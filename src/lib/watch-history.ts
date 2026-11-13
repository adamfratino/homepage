import { cacheLife, cacheTag } from "next/cache";

import { PLEX_OWNER_ACCOUNT_ID } from "@/constants/plex";
import { getPlexContainer, getPlexServerUrl } from "@/lib/plex";

/** How many recent films and shows to show. */
export const RECENT_LIMIT = 2;

export type WatchedMovie = {
  title: string;
  year: number | null;
  /** When the movie was marked watched, as an ISO timestamp. */
  watchedAt: string;
  /** The owner's own rating on Plex's 0-10 scale (two points per star), or null if unrated. */
  userRating: number | null;
  /** When that rating was last set, as an ISO timestamp, or null if unrated. */
  ratedAt: string | null;
};

export type WatchedShow = {
  title: string;
  /** Season and episode of the last completed episode, e.g. "S01E04". */
  episodeCode: string;
  /** When that episode was marked watched, as an ISO timestamp. */
  watchedAt: string;
};

/**
 * One row of the server's watch history. Plex writes a row only once playback passes the
 * scrobble threshold (about 90%), so every row here is a completed viewing.
 */
export type HistoryEntry = {
  type: string;
  ratingKey?: string;
  /** The film, episode or track title. */
  title?: string;
  viewedAt: number;
  /** Tracks only: the album. */
  parentTitle?: string;
  /** Episodes: the show, as "/library/metadata/<key>". Tracks: the album artist. */
  grandparentKey?: string;
  grandparentTitle?: string;
  /** Episodes only: season and episode numbers. */
  parentIndex?: number;
  index?: number;
};
type HistoryContainer = { Metadata?: HistoryEntry[] };
type SectionsContainer = { Directory?: { key: string; type: string }[] };
type MetadataContainer = {
  Metadata?: {
    ratingKey: string;
    title: string;
    year?: number;
    userRating?: number;
    /** Unix seconds; present only once the owner has rated the film. */
    lastRatedAt?: number;
  }[];
};

/** Which libraries a history request covers, as the Plex library types that belong to it. */
const LIBRARY_TYPES = { video: ["movie", "show"], music: ["artist"] } as const;

export type HistoryKind = keyof typeof LIBRARY_TYPES;

export type OwnerHistory = { serverUrl: string; entries: HistoryEntry[] };

/**
 * The owner's recent completed plays of one kind, newest first. Video is fetched once and shared
 * by the film and TV rows. Music is asked for separately, because the history has no type filter
 * and an afternoon of songs would otherwise push every film and episode out of the page of rows.
 */
export async function getOwnerHistory(kind: HistoryKind): Promise<OwnerHistory | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("plex-history");

  // Errors thrown inside a cached function fail the prerender even if the caller catches them,
  // so a missing token, unreachable NAS, or API change degrades to "no section" here.
  try {
    const serverUrl = await getPlexServerUrl();
    const sections = await getPlexContainer<SectionsContainer>(serverUrl, "/library/sections");
    const types: readonly string[] = LIBRARY_TYPES[kind];
    const sectionIds = (sections.Directory ?? [])
      .filter((section) => types.includes(section.type))
      .map((section) => section.key);
    if (sectionIds.length === 0) return { serverUrl, entries: [] };

    // Owner only. 100 rows comfortably covers a few binge evenings.
    const history = await getPlexContainer<HistoryContainer>(
      serverUrl,
      `/status/sessions/history/all?accountID=${PLEX_OWNER_ACCOUNT_ID}` +
        `&librarySectionID=${sectionIds.join(",")}` +
        "&sort=viewedAt:desc&X-Plex-Container-Start=0&X-Plex-Container-Size=100",
    );
    return { serverUrl, entries: history.Metadata ?? [] };
  } catch (error) {
    console.error(`getOwnerHistory: could not load Plex ${kind} history`, error);
    return null;
  }
}

/** Converts Plex's Unix seconds to an ISO timestamp. */
export function toIso(viewedAt: number): string {
  return new Date(viewedAt * 1000).toISOString();
}

export async function getRecentMovies(): Promise<WatchedMovie[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("plex-movies");

  const history = await getOwnerHistory("video");
  if (!history) return [];

  // The same film can appear twice (resumed viewings); keep the newest row per film.
  const entries: HistoryEntry[] = [];
  for (const item of history.entries) {
    if (item.type !== "movie" || !item.ratingKey) continue;
    if (entries.some((entry) => entry.ratingKey === item.ratingKey)) continue;
    entries.push(item);
    if (entries.length === RECENT_LIMIT) break;
  }
  if (entries.length === 0) return [];

  try {
    const keys = entries.map((entry) => entry.ratingKey).join(",");
    const metadata = await getPlexContainer<MetadataContainer>(
      history.serverUrl,
      `/library/metadata/${keys}`,
    );
    const byKey = new Map(metadata.Metadata?.map((movie) => [movie.ratingKey, movie]));

    return entries.flatMap((entry) => {
      const movie = byKey.get(entry.ratingKey!);
      if (!movie) return [];
      return {
        title: movie.title,
        year: movie.year ?? null,
        watchedAt: toIso(entry.viewedAt),
        userRating: movie.userRating ?? null,
        ratedAt: movie.lastRatedAt ? toIso(movie.lastRatedAt) : null,
      };
    });
  } catch (error) {
    console.error("getRecentMovies: could not load film metadata", error);
    return [];
  }
}

const pad2 = (n: number) => String(n).padStart(2, "0");

function episodeCode(season: number, episode: number): string {
  return `S${pad2(season)}E${pad2(episode)}`;
}

/**
 * Shows the owner is currently watching, newest first: one row per show, positioned at the last
 * episode they finished. Derived from history rather than Plex's Continue Watching hub, which
 * drops a show as soon as its next episode is not in the library yet.
 */
export async function getRecentShows(): Promise<WatchedShow[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("plex-shows");

  const history = await getOwnerHistory("video");
  if (!history) return [];

  const shows: WatchedShow[] = [];
  const seen = new Set<string>();
  for (const item of history.entries) {
    if (item.type !== "episode" || !item.grandparentKey || !item.grandparentTitle) continue;
    if (item.parentIndex === undefined || item.index === undefined) continue;
    if (seen.has(item.grandparentKey)) continue;
    seen.add(item.grandparentKey);
    shows.push({
      title: item.grandparentTitle,
      episodeCode: episodeCode(item.parentIndex, item.index),
      watchedAt: toIso(item.viewedAt),
    });
    if (shows.length === RECENT_LIMIT) break;
  }
  return shows;
}
