import { getRecentPurchases } from "@/lib/bandcamp";
import { getRecentTracks } from "@/lib/listen-history";
import { getGamesUpdatedAt, PLATFORMS } from "@/lib/play-tracker";
import { getRecentMovies, getRecentShows } from "@/lib/watch-history";

/** Build-time stamp of the latest commit (see next.config.ts); absent only in an unconfigured build. */
const CODE_UPDATED_AT = process.env.SITE_UPDATED_AT;

/**
 * When the site last changed: the newest of the latest commit and every media item on the page
 * (a film watched or rated, an episode watched, a song played, a Bandcamp purchase, a game
 * played). Null only when there is no commit stamp and no media loaded.
 */
export async function getLastUpdated(): Promise<string | null> {
  const [movies, shows, tracks, purchases, ...games] = await Promise.all([
    getRecentMovies(),
    getRecentShows(),
    getRecentTracks(),
    getRecentPurchases(),
    ...PLATFORMS.map((platform) => getGamesUpdatedAt(platform)),
  ]);

  const times = [
    CODE_UPDATED_AT,
    ...movies.flatMap((movie) => [movie.watchedAt, movie.ratedAt]),
    ...shows.map((show) => show.watchedAt),
    ...tracks.map((track) => track.playedAt),
    ...purchases.map((purchase) => purchase.purchasedAt),
    ...games,
  ]
    .map((timestamp) => (timestamp ? Date.parse(timestamp) : Number.NaN))
    .filter((time) => !Number.isNaN(time));

  return times.length > 0 ? new Date(Math.max(...times)).toISOString() : null;
}
