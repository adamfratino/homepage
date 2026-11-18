import Image from "next/image";
import { Group } from "@uiid/design-system";

import { SPACING_SM } from "@/constants/ui";
import { getAlbumPhotos } from "@/lib/photos";

/** Rendered thumbnail edge in CSS px. The files are 2x this. */
const THUMB_SIZE = 120;

const takenOn = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

type PhotoThumbsProps = {
  /** Album slug as published by the NAS photosync container, e.g. "bathroom-selfies". */
  album: string;
  limit: number;
  /** Alt text for each thumbnail, followed by the date it was taken. */
  label: string;
};

/** The newest photos of an album as square thumbnails, each opening its full-size photo in a new tab. */
export async function PhotoThumbs({ album, limit, label }: PhotoThumbsProps) {
  const photos = await getAlbumPhotos(album, limit);
  if (photos.length === 0) return null;

  return (
    <Group gap={SPACING_SM} wrap>
      {photos.map((photo) => (
        <a key={photo.id} href={photo.src} target="_blank" rel="noopener noreferrer">
          {/* Already resized on the NAS, so skip the image optimizer. */}
          <Image
            unoptimized
            src={photo.thumb}
            alt={`${label}, ${takenOn.format(new Date(`${photo.takenAt}Z`))}`}
            width={THUMB_SIZE}
            height={THUMB_SIZE}
            className="block"
          />
        </a>
      ))}
    </Group>
  );
}
