import { Group, Stack } from "@uiid/design-system";

import { SPACING_SM } from "@/constants/ui";
import { formatCalendarDate } from "@/lib/format";
import {
  getRecentGames,
  PLATFORM_LABEL,
  type Platform,
  type TrackedGame,
} from "@/lib/play-tracker";

import { HobbiesText } from "@/components/shared/hobbies-text";

function formatPlayTime(seconds: number): string {
  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
}

type GameRowProps = { game: TrackedGame; className?: string };

function GameRow({ game, className }: GameRowProps) {
  return (
    <Group gap={SPACING_SM} ay="center" className={className}>
      <HobbiesText weight="bold">{game.title},</HobbiesText>
      {game.lastPlayed && (
        <HobbiesText>{formatCalendarDate(game.lastPlayed)},</HobbiesText>
      )}
      {game.playSeconds !== null && (
        <HobbiesText>{formatPlayTime(game.playSeconds)}</HobbiesText>
      )}
    </Group>
  );
}

type RecentGamesProps = { platform: Platform };

export async function RecentGames({ platform }: RecentGamesProps) {
  const [latest, ...earlier] = await getRecentGames(platform);
  if (!latest) return null;

  return (
    <Group gap={SPACING_SM} ay="start">
      <HobbiesText render={<h4 />} weight="bold" className="min-w-8">
        {PLATFORM_LABEL[platform]}:
      </HobbiesText>
      <Stack>
        <GameRow game={latest} />
        {earlier.map((game) => (
          <GameRow key={game.gameId} game={game} className="opacity-50" />
        ))}
      </Stack>
    </Group>
  );
}
