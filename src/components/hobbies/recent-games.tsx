import { Group, Separator, Stack } from "@uiid/design-system";

import { SPACING_SM } from "@/constants/ui";
import { formatCalendarDate } from "@/lib/format";
import {
  getRecentGames,
  PLATFORM_LABEL,
  type Platform,
  type TrackedGame,
} from "@/lib/play-tracker";

import { MonoText } from "@/components/shared/mono-text";

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
      <MonoText weight="bold">{game.title}</MonoText>
      {game.lastPlayed && (
        <>
          <Separator orientation="vertical" />
          <MonoText>{formatCalendarDate(game.lastPlayed)}</MonoText>
        </>
      )}
      {game.playSeconds !== null && (
        <>
          <Separator orientation="vertical" />
          <MonoText>{formatPlayTime(game.playSeconds)}</MonoText>
        </>
      )}
    </Group>
  );
}

type RecentGamesProps = { platform: Platform };

/** The platform label beside its most recent game, with the one before it dimmed underneath. */
export async function RecentGames({ platform }: RecentGamesProps) {
  const [latest, ...earlier] = await getRecentGames(platform);
  if (!latest) return null;

  return (
    <Group gap={SPACING_SM} ay="start">
      <MonoText render={<h4 />} weight="bold">
        {PLATFORM_LABEL[platform]}:
      </MonoText>
      <Stack>
        <GameRow game={latest} />
        {earlier.map((game) => (
          <GameRow key={game.gameId} game={game} className="opacity-50" />
        ))}
      </Stack>
    </Group>
  );
}
