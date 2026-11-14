import { readdirSync } from "node:fs";
import path from "node:path";

import type { MDXContent } from "mdx/types";

const NOTES_DIRECTORY = path.join(process.cwd(), "notes");
const NOTE_EXTENSION = ".mdx";

export type NoteSummary = {
  slug: string;
  title: string;
  /** Zone-less calendar date, YYYY-MM-DD. */
  date: string;
};

export type Note = NoteSummary & { Content: MDXContent };

type NoteModule = { default: MDXContent; frontmatter?: Record<string, unknown> };

function getNoteSlugs(): string[] {
  return readdirSync(NOTES_DIRECTORY)
    .filter((file) => file.endsWith(NOTE_EXTENSION))
    .map((file) => file.slice(0, -NOTE_EXTENSION.length));
}

/** Loads one note, or null when no note has that slug. Throws when its frontmatter is incomplete. */
export async function getNote(slug: string): Promise<Note | null> {
  if (!getNoteSlugs().includes(slug)) return null;

  const { default: Content, frontmatter }: NoteModule = await import(`../../notes/${slug}.mdx`);
  const { title, date } = frontmatter ?? {};
  if (typeof title !== "string" || typeof date !== "string") {
    throw new Error(`notes/${slug}.mdx needs a string "title" and "date" in its frontmatter`);
  }

  return { slug, title, date, Content };
}

/** Every note in notes/, newest first. */
export async function getNotes(): Promise<NoteSummary[]> {
  const notes = await Promise.all(getNoteSlugs().map((slug) => getNote(slug)));
  return notes
    .filter((note) => note !== null)
    .map(({ slug, title, date }) => ({ slug, title, date }))
    .toSorted((a, b) => b.date.localeCompare(a.date));
}
