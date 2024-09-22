"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

import Title from "./title";
import Bio from "./bio.mdx";
import Technologies from "./technologies.mdx";
import Hobbies from "./hobbies.mdx";

import { useDelayedLoad } from "@/src/hooks/useDelayedLoad";

const Paragraph = ({ children }: PropsWithChildren) => (
  <p className="text-paragraph">{children}</p>
);

const Anchor = ({ children, ...props }: PropsWithChildren) => (
  <a target="_blank" {...props}>
    {children}
  </a>
);

const ListItem = ({ children }: PropsWithChildren) => (
  <li className="text-sm italic mb-2 last:mb-0">{children}</li>
);

const markdownStyles = {
  a: Anchor,
  p: Paragraph,
  li: ListItem,
};

const Details = () => {
  const loaded = useDelayedLoad(500);

  return (
    loaded && (
      <motion.div
        className="max-w-xl flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title text="adam fratino" />

        <div className="border-y border-y-black py-5 mt-3 mb-2">
          <Bio components={markdownStyles} />
        </div>

        <div className="border-b border-b-black flex gap-2 text-lg md:text-xl mb-5 pb-2">
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
          <a href="https://cargocollective.com/adamfratino" target="_blank">
            cargo
          </a>
        </div>

        <Technologies components={markdownStyles} />

        <hr className="my-5 h-[1px] border-t border-t-black" />

        <Hobbies components={markdownStyles} />
      </motion.div>
    )
  );
};

export default Details;
