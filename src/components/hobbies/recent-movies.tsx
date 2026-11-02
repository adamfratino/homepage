import { Group, Text, Stack } from "@uiid/design-system";

import { SPACING_SM } from "@/constants/ui";
import { formatHomeDate } from "@/lib/format";
import { getRecentMovies, type WatchedMovie } from "@/lib/watch-history";

import { StarRating } from "@/components/shared/star-rating";

import { MonoText } from "../shared/mono-text";

type MovieRowProps = { movie: WatchedMovie; className?: string };

function MovieRow({ movie, className }: MovieRowProps) {
  return (
    <Group gap={SPACING_SM} ay="end" className={className}>
      <MonoText weight="bold">{movie.title},</MonoText>
      <MonoText size={-1}>{formatHomeDate(movie.watchedAt)},</MonoText>
      {movie.userRating !== null && <StarRating rating={movie.userRating} />}
    </Group>
  );
}

/** "MOV:" beside the most recently finished film, with the one before it dimmed underneath. */
export async function RecentMovies() {
  const [latest, ...earlier] = await getRecentMovies();
  if (!latest) return null;

  return (
    <Group gap={SPACING_SM} ay="start">
      <MonoText render={<h4 />} weight="bold">
        MOV:
      </MonoText>
      <Stack>
        <MovieRow movie={latest} />
        {earlier.map((movie) => (
          <MovieRow key={movie.watchedAt} movie={movie} className="opacity-50" />
        ))}
      </Stack>
    </Group>
  );
}
