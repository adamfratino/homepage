import Link from "next/link";

export default function NoteLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="py-8 flex flex-col gap-4 px-4 max-w-screen-sm mx-auto">
      <nav className="inline-block py-2 sticky top-0 bg-white w-full">
        <Link href="/notes">
          <span className="inline-block rotate-180 pl-2">➣</span>Back to notes
        </Link>
      </nav>
      <article>{children}</article>
    </main>
  );
}
