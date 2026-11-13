import { Group, Stack } from "@uiid/design-system";

import { SPACING_SM, SPACING_XS } from "@/constants/ui";
import { formatHomeDate } from "@/lib/format";
import { getRecentTracks, type PlayedTrack } from "@/lib/listen-history";

import { HobbiesText } from "@/components/shared/hobbies-text";

type TrackRowProps = { track: PlayedTrack; className?: string };

function TrackRow({ track, className }: TrackRowProps) {
  return (
    <Group gap={SPACING_SM} ay="center" className={className}>
      <HobbiesText weight="bold">{track.title},</HobbiesText>
      <HobbiesText>{track.artist},</HobbiesText>
      <HobbiesText>{formatHomeDate(track.playedAt)}</HobbiesText>
    </Group>
  );
}

export async function RecentTracks() {
  const [latest, ...earlier] = await getRecentTracks();
  if (!latest) return null;

  return (
    <Group gap={SPACING_SM} ay="start">
      <HobbiesText render={<h4 />} weight="bold" className="min-w-8">
        MP3:
      </HobbiesText>
      <Stack gap={SPACING_XS}>
        <TrackRow track={latest} />
        {earlier.map((track) => (
          <TrackRow key={track.id} track={track} className="opacity-50" />
        ))}
      </Stack>
    </Group>
  );
}
