import Image from "next/image";
import { preconnect } from "react-dom";
import { Group } from "@uiid/design-system";

import { PHOTOS_BLOB_URL, THUMB_SIZE } from "@/constants/photos";
import { SPACING_SM } from "@/constants/ui";
import { getAlbumPhotos } from "@/lib/photos";

type PhotoThumbsProps = {
  /** Album slug on the photo store, e.g. "bathroom-selfies". */
  album: string;
  limit: number;
  /** Alt text for each thumbnail, followed by the date it was taken. */
  label: string;
};

/** The newest photos of an album as square thumbnails, each opening its full-size photo in a new tab. */
export async function PhotoThumbs({ album, limit, label }: PhotoThumbsProps) {
  const photos = await getAlbumPhotos(album, limit);
  if (photos.length === 0) return null;

  // The thumbnails are the only requests to the Blob host, so open that connection early.
  preconnect(new URL(PHOTOS_BLOB_URL).origin);

  return (
    <Group gap={SPACING_SM} wrap>
      {photos.map((photo) => (
        <a
          key={photo.id}
          href={photo.src}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Already resized by the sync job, so skip the image optimizer. */}
          <Image
            unoptimized
            src={photo.thumb}
            alt={`${label}, ${photo.takenOn}`}
            width={THUMB_SIZE}
            height={THUMB_SIZE}
            className="block"
          />
        </a>
      ))}
    </Group>
  );
}
