import { cacheLife, cacheTag } from "next/cache";

import { getOwnerHistory, toIso } from "@/lib/watch-history";
import { RECENT_MP3_LIMIT } from "@/constants/hobbies";

export type PlayedTrack = {
  /** Plex's id for the track; stable across plays. */
  id: string;
  title: string;
  /** The album artist, which is what Plex's history records for a track. */
  artist: string;
  album: string | null;
  /** When the track was last played through, as an ISO timestamp. */
  playedAt: string;
};

/** The songs the owner last played through Plex, newest first, one row per song. */
export async function getRecentTracks(): Promise<PlayedTrack[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("plex-tracks");

  const history = await getOwnerHistory("music");
  if (!history) return [];

  const tracks: PlayedTrack[] = [];
  for (const item of history.entries) {
    if (
      item.type !== "track" ||
      !item.ratingKey ||
      !item.title ||
      !item.grandparentTitle
    )
      continue;
    // A song on repeat appears once, at its newest play.
    if (tracks.some((track) => track.id === item.ratingKey)) continue;
    tracks.push({
      id: item.ratingKey,
      title: item.title,
      artist: item.grandparentTitle,
      album: item.parentTitle ?? null,
      playedAt: toIso(item.viewedAt),
    });
    if (tracks.length === RECENT_MP3_LIMIT) break;
  }
  return tracks;
}
