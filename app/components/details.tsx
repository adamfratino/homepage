import Link from "next/link";
import type { PropsWithChildren } from "react";

import Title from "./title";
import Bio from "./bio.mdx";
// import Technologies from "./technologies.mdx";
// import Hobbies from "./hobbies.mdx";

const Paragraph = ({ children }: PropsWithChildren) => (
  <p className="text-paragraph">{children}</p>
);

const Anchor = ({ children, ...props }: PropsWithChildren) => (
  <a target="_blank" {...props}>
    {children}
  </a>
);

const ListItem = ({ children }: PropsWithChildren) => (
  <li className="text-sm italic mb-0.5 last:mb-0">{children}</li>
);

const markdownStyles = {
  a: Anchor,
  p: Paragraph,
  li: ListItem,
};

const Details = () => {
  return (
    <div className="max-w-xl flex flex-col">
      <Title text="adam fratino" />

      <div className="py-3">
        <Bio components={markdownStyles} />
      </div>

      <div className="border-t border-t-black flex gap-2 text-lg md:text-xl pt-2">
        <a href="/docs/resume.pdf" target="_blank">
          resume
        </a>
        &middot;
        <a href="https://github.com/adamfratino" target="_blank">
          github
        </a>
        &middot;
        <a
          href="https://www.linkedin.com/in/adam-fratino-a26868311/"
          target="_blank"
        >
          linkedin
        </a>
        &middot;
        <Link href="/notes">notes</Link>
        &middot;
        <a href="https://cargocollective.com/adamfratino" target="_blank">
          cargo
        </a>
      </div>

      {/* <Technologies components={markdownStyles} /> */}
      {/* <Hobbies components={markdownStyles} /> */}
    </div>
  );
};

export default Details;
