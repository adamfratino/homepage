import Link from "next/link";

import { getSortedNotesData } from "./getSortedNotesData";

export default function Notes() {
  const notes = getSortedNotesData();

  return (
    <div className="p-6">
      <ul className="flex flex-col gap-4">
        {notes.map((note) => (
          <li key={note.id}>
            <Link
              href={"notes/" + note.id.split(".")[0]}
              className="flex flex-col"
            >
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <span className="text-sm">{note.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
