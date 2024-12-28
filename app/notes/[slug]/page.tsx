import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { synthwave84 } from "react-syntax-highlighter/dist/esm/styles/prism";

import { getSortedNotesData } from "../getSortedNotesData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const notes = getSortedNotesData();
  const noteTitles = notes.map((note) => ({ title: note.title }));

  return noteTitles;
}

function code({ ...props }) {
  const match = /language-(\w+)/.exec(props.className || "");

  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      style={synthwave84}
      {...props}
    >
      {props.children}
    </SyntaxHighlighter>
  ) : (
    <code className={props.className} {...props} />
  );
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const { default: Note } = await import(`@/notes/${slug}.mdx`);

  return <Note components={{ code }} />;
}

export function generateStaticParams() {
  const notes = getSortedNotesData();
  return notes.map((note) => ({ slug: note.id.split(".")[0] }));
}

export const dynamicParams = false;
