import { formatHomeDateTime } from "@/lib/format";
import { getLastUpdated } from "@/lib/last-updated";

import { HobbiesText } from "@/components/shared/hobbies-text";

/** "Last updated Nov 1, 2026, 10:35 PM EDT", with a machine-readable <time>. */
export async function LastUpdated() {
  const updatedAt = await getLastUpdated();
  if (!updatedAt) return null;
  return (
    <HobbiesText>
      Last updated <time dateTime={updatedAt}>{formatHomeDateTime(updatedAt)}</time>
    </HobbiesText>
  );
}
