import { Group, Text, Stack } from "@uiid/design-system";

import { SPACING_SM } from "@/constants/ui";
import { formatHomeDate } from "@/lib/format";
import { getRecentMovies, type WatchedMovie } from "@/lib/watch-history";

import { StarRating } from "@/components/shared/star-rating";

import { HobbiesText } from "../shared/hobbies-text";

type MovieRowProps = { movie: WatchedMovie; className?: string };

function MovieRow({ movie, className }: MovieRowProps) {
  return (
    <Group gap={SPACING_SM} ay="end" className={className}>
      <HobbiesText weight="bold">{movie.title},</HobbiesText>
      <HobbiesText size={-1}>{formatHomeDate(movie.watchedAt)},</HobbiesText>
      {movie.userRating !== null && <StarRating rating={movie.userRating} />}
    </Group>
  );
}

export async function RecentMovies() {
  const [latest, ...earlier] = await getRecentMovies();
  if (!latest) return null;

  return (
    <Group gap={SPACING_SM} ay="start">
      <HobbiesText render={<h4 />} weight="bold" className="min-w-8">
        MOV:
      </HobbiesText>
      <Stack>
        <MovieRow movie={latest} />
        {earlier.map((movie) => (
          <MovieRow
            key={movie.watchedAt}
            movie={movie}
            className="opacity-50"
          />
        ))}
      </Stack>
    </Group>
  );
}
