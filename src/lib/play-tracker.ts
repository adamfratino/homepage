import { cacheLife, cacheTag } from "next/cache";

import {
  LINEAR_PS2_TRACKER_DOCUMENT_ID,
  LINEAR_PS5_TRACKER_DOCUMENT_ID,
  LINEAR_PSX_TRACKER_DOCUMENT_ID,
} from "@/constants/linear";
import { getLinearDocument } from "@/lib/linear";

export type Platform = "psx" | "ps2" | "ps5";

export const PLATFORM_LABEL: Record<Platform, string> = { psx: "PSX", ps2: "PS2", ps5: "PS5" };

export const PLATFORMS = Object.keys(PLATFORM_LABEL) as Platform[];

const TRACKER_DOCUMENT_ID: Record<Platform, string> = {
  psx: LINEAR_PSX_TRACKER_DOCUMENT_ID,
  ps2: LINEAR_PS2_TRACKER_DOCUMENT_ID,
  ps5: LINEAR_PS5_TRACKER_DOCUMENT_ID,
};

export type TrackedGame = {
  title: string;
  gameId: string;
  status: string;
  /** ISO date (YYYY-MM-DD) of the last played session, or null if never played. */
  lastPlayed: string | null;
  /** Total played time in seconds, or null if never played. */
  playSeconds: number | null;
};

const GAMES_HEADING = "## Games";
// "Title (SLUS_123.45, CD, Modes 1, 2)" or "Title (PPSA01234_00, PS4)" -> title + game id; mirrors the
// watchers' GID_RE (PS1/PS2 disc ids) and TID_RE (PSN title ids).
const GAME_CELL = /^(.*?)\s*\(([A-Z]{4}_\d{3}\.\d{2}|[A-Z]{4}\d{5}(?:_\d{2})?)(?:,[^)]*)?\)\s*$/;
// "2026-11-01 · 16m" or "2026-11-01 · 1h 05m"; mirrors the watcher's fmt_time.
const PLAYED_CELL = /^(\d{4}-\d{2}-\d{2})\s*·\s*(?:(\d+)h\s*)?(\d+)m$/;

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim());
}

/** Parses the Games table of a compatibility tracker document into structured rows. */
export function parseTrackedGames(content: string): TrackedGame[] {
  const lines = content.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === GAMES_HEADING);
  if (headingIndex === -1) return [];

  // Skip to the first table row after the heading, then consume consecutive rows.
  let index = headingIndex + 1;
  while (index < lines.length && !lines[index].trimStart().startsWith("|")) index += 1;
  const rows: string[] = [];
  while (index < lines.length && lines[index].trimStart().startsWith("|")) {
    rows.push(lines[index]);
    index += 1;
  }

  // Drop the header row and the `| -- |` separator.
  const games: TrackedGame[] = [];
  for (const line of rows.slice(2)) {
    const [game = "", status = "", played = ""] = splitRow(line);
    const gameMatch = GAME_CELL.exec(game);
    if (!gameMatch) continue;
    const playedMatch = PLAYED_CELL.exec(played);
    const hours = playedMatch?.[2] ? Number(playedMatch[2]) : 0;
    const minutes = playedMatch?.[3] ? Number(playedMatch[3]) : 0;

    games.push({
      title: gameMatch[1],
      gameId: gameMatch[2],
      status,
      lastPlayed: playedMatch?.[1] ?? null,
      playSeconds: playedMatch ? (hours * 60 + minutes) * 60 : null,
    });
  }
  return games;
}

/** How many recent titles each platform shows. */
export const RECENT_LIMIT = 2;

/**
 * Played games, most recent first. The tracker only records a date, so same-day ties are ordered
 * by session length, longest first.
 */
export function recentlyPlayedGames(games: TrackedGame[], limit = RECENT_LIMIT): TrackedGame[] {
  return games
    .filter((game) => game.lastPlayed !== null)
    .toSorted(
      (a, b) =>
        b.lastPlayed!.localeCompare(a.lastPlayed!) || (b.playSeconds ?? 0) - (a.playSeconds ?? 0),
    )
    .slice(0, limit);
}

type Tracker = {
  /** The most recently played games, newest first. */
  games: TrackedGame[];
  /** When the tracker document last changed, as an ISO timestamp; null if it could not be loaded. */
  updatedAt: string | null;
};

async function getTracker(platform: Platform): Promise<Tracker> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`${platform}-tracker`);

  // Errors thrown inside a cached function fail the prerender even if the caller catches them,
  // so a missing key, Linear outage, or reformatted document degrades to "no section" here.
  try {
    const document = await getLinearDocument(TRACKER_DOCUMENT_ID[platform]);
    return {
      games: recentlyPlayedGames(parseTrackedGames(document.content)),
      updatedAt: document.updatedAt,
    };
  } catch (error) {
    console.error(`getTracker(${platform}): could not load tracker`, error);
    return { games: [], updatedAt: null };
  }
}

export async function getRecentGames(platform: Platform): Promise<TrackedGame[]> {
  return (await getTracker(platform)).games;
}

/**
 * When a platform's games last changed. The Played column only records a date, so this is the
 * tracker document's own edit time; null when the platform shows no games.
 */
export async function getGamesUpdatedAt(platform: Platform): Promise<string | null> {
  const { games, updatedAt } = await getTracker(platform);
  return games.length > 0 ? updatedAt : null;
}
