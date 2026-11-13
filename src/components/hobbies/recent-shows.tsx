import { Group, Stack } from "@uiid/design-system";

import { SPACING_SM, SPACING_XS } from "@/constants/ui";
import { formatHomeDate } from "@/lib/format";
import { getRecentShows, type WatchedShow } from "@/lib/watch-history";

import { HobbiesText } from "../shared/hobbies-text";

type ShowRowProps = { show: WatchedShow; className?: string };

function ShowRow({ show, className }: ShowRowProps) {
  return (
    <Group gap={SPACING_SM} ay="center" className={className}>
      <HobbiesText weight="bold">{show.title},</HobbiesText>
      <HobbiesText>{show.episodeCode},</HobbiesText>
      <HobbiesText>{formatHomeDate(show.watchedAt)}</HobbiesText>
    </Group>
  );
}

export async function RecentShows() {
  const [latest, ...earlier] = await getRecentShows();
  if (!latest) return null;

  return (
    <Group gap={SPACING_SM} ay="start">
      <HobbiesText render={<h4 />} weight="bold" className="min-w-8">
        TV:
      </HobbiesText>
      <Stack gap={SPACING_XS}>
        <ShowRow show={latest} />
        {earlier.map((show) => (
          <ShowRow key={show.title} show={show} className="opacity-50" />
        ))}
      </Stack>
    </Group>
  );
}
