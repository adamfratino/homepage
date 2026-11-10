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
  /** When the rating was last set or cleared, as an ISO timestamp; null if it never was. */
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
type HistoryEntry = {
  type: string;
  ratingKey?: string;
  viewedAt: number;
  /** Episodes only: the show, as "/library/metadata/<key>". */
  grandparentKey?: string;
  grandparentTitle?: string;
  /** Episodes only: season and episode numbers. */
  parentIndex?: number;
  index?: number;
};
type HistoryContainer = { Metadata?: HistoryEntry[] };
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

// Newest first, owner only. 100 rows comfortably covers a few binge evenings.
const HISTORY_PATH =
  `/status/sessions/history/all?accountID=${PLEX_OWNER_ACCOUNT_ID}` +
  "&sort=viewedAt:desc&X-Plex-Container-Start=0&X-Plex-Container-Size=100";

type OwnerHistory = { serverUrl: string; entries: HistoryEntry[] };

/** The owner's recent completed viewings, fetched once and shared by the film and TV rows. */
async function getOwnerHistory(): Promise<OwnerHistory | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("plex-history");

  // Errors thrown inside a cached function fail the prerender even if the caller catches them,
  // so a missing token, unreachable NAS, or API change degrades to "no section" here.
  try {
    const serverUrl = await getPlexServerUrl();
    const history = await getPlexContainer<HistoryContainer>(serverUrl, HISTORY_PATH);
    return { serverUrl, entries: history.Metadata ?? [] };
  } catch (error) {
    console.error("getOwnerHistory: could not load Plex history", error);
    return null;
  }
}

function toIso(viewedAt: number): string {
  return new Date(viewedAt * 1000).toISOString();
}

export async function getRecentMovies(): Promise<WatchedMovie[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("plex-movies");

  const history = await getOwnerHistory();
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

  const history = await getOwnerHistory();
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
