import Link from "next/link";
import { Prose } from "@uiid/design-system";

import { PROSE_LIST_OUTDENT } from "@/constants/ui";
import { formatCalendarDate } from "@/lib/format";
import { getNotes } from "@/lib/notes";

/** Every note as a prose bullet, matching the "Side projects" list: bold link, dash, detail. */
export async function RecentNotes() {
  const notes = await getNotes();
  if (notes.length === 0) return null;

  return (
    <Prose ml={PROSE_LIST_OUTDENT}>
      <ul>
        {notes.map((note) => (
          <li key={note.slug}>
            <strong>
              {/* A default link prefetches only the route's shared, empty shell; this one fetches the static note. */}
              <Link href={`/notes/${note.slug}`} prefetch>
                {note.title}
              </Link>
            </strong>{" "}
            &mdash; <time dateTime={note.date}>{formatCalendarDate(note.date)}</time>
          </li>
        ))}
      </ul>
    </Prose>
  );
}
