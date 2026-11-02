import localFont from "next/font/local";
import { cx } from "@uiid/design-system";

import { MonoText } from "@/components/shared/mono-text";

// Only ★ ☆ ⯪ live in this file; everything else falls through to the surrounding font.
const starsFont = localFont({
  src: "../../fonts/noto-sans-symbols-2-stars.woff2",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+2605-2606, U+2BEA" }],
});

const FULL = "★";
const HALF = "⯪";
const EMPTY = "☆";

type StarRatingProps = {
  /** Plex's 0-10 scale: two points per star, odd values are half stars. */
  rating: number;
};

export function StarRating({ rating }: StarRatingProps) {
  const clamped = Math.min(10, Math.max(0, Math.round(rating)));
  const full = Math.floor(clamped / 2);
  const half = clamped % 2 === 1;
  const stars = FULL.repeat(full) + (half ? HALF : "") + EMPTY.repeat(5 - full - (half ? 1 : 0));
  const label = `${clamped / 2} out of 5 stars`;

  return (
    <MonoText
      render={<abbr />}
      className={cx(starsFont.className, "no-underline translate-y-0.5")}
      title={label}
      aria-label={label}
    >
      {stars}
    </MonoText>
  );
}
