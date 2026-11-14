import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@uiid/design-system";

import { TITLE } from "@/constants/copy";
import { NOTES_MAXWIDTH } from "@/constants/ui";
import { formatCalendarDate } from "@/lib/format";
import { getNote, getNotes } from "@/lib/notes";

import { HobbiesText } from "@/components/shared/hobbies-text";
import { MainLayout } from "@/components/shared/main-layout";

/**
 * Every note is fully static. An unknown slug waits for its (not-found) render instead of
 * streaming a fallback shell, so it can answer with a real 404 status.
 */
export const ensureStatic = "navigation";

/** Prerenders every note in notes/. */
export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);
  return note ? { title: `${note.title} | ${TITLE}` } : {};
}

/**
 * The route's shell is shared by every note, so it can't read the slug. The note itself resolves
 * inside Suspense: prerendered into the page's HTML at build, streamed in on a client navigation.
 */
export default function NotePage({ params }: PageProps<"/notes/[slug]">) {
  return (
    <Suspense fallback={null}>
      <Note params={params} />
    </Suspense>
  );
}

async function Note({ params }: Pick<PageProps<"/notes/[slug]">, "params">) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();

  const { title, date, Content } = note;

  return (
    <MainLayout
      maxw={NOTES_MAXWIDTH}
      title={title}
      description={<time dateTime={date}>{formatCalendarDate(date)}</time>}
      footer={<HobbiesText render={<Link href="/" />}>&larr; {TITLE}</HobbiesText>}
    >
      <Prose>
        <Content />
      </Prose>
    </MainLayout>
  );
}
