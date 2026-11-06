import { formatHomeDateTime } from "@/lib/format";

import { HobbiesText } from "@/components/shared/hobbies-text";

/** Build-time stamp of the latest commit (see next.config.ts); absent only in an unconfigured build. */
const UPDATED_AT = process.env.SITE_UPDATED_AT;

/** "Last updated Nov 1, 2026, 10:35 PM EDT", with a machine-readable <time>. */
export function LastUpdated() {
  if (!UPDATED_AT) return null;
  return (
    <HobbiesText>
      Last updated{" "}
      <time dateTime={UPDATED_AT}>{formatHomeDateTime(UPDATED_AT)}</time>
    </HobbiesText>
  );
}
