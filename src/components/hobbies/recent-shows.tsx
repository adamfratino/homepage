import { Group, Text, Stack } from "@uiid/design-system";

import { SPACING_SM } from "@/constants/ui";
import { formatHomeDate } from "@/lib/format";
import { getRecentShows, type WatchedShow } from "@/lib/watch-history";

import { MonoText } from "../shared/mono-text";

type ShowRowProps = { show: WatchedShow; className?: string };

function ShowRow({ show, className }: ShowRowProps) {
  return (
    <Group gap={SPACING_SM} ay="center" className={className}>
      <MonoText weight="bold">{show.title},</MonoText>
      <MonoText>{formatHomeDate(show.watchedAt)},</MonoText>
      <MonoText>{show.episodeCode}</MonoText>
    </Group>
  );
}

/** "TV:" beside the show most recently watched, at its last finished episode, with the one before it dimmed underneath. */
export async function RecentShows() {
  const [latest, ...earlier] = await getRecentShows();
  if (!latest) return null;

  return (
    <Group gap={SPACING_SM} ay="start">
      <MonoText render={<h4 />} weight="bold">
        TV&nbsp;:
      </MonoText>
      <Stack>
        <ShowRow show={latest} />
        {earlier.map((show) => (
          <ShowRow key={show.title} show={show} className="opacity-50" />
        ))}
      </Stack>
    </Group>
  );
}
