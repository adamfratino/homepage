import type { Metadata } from "next";
import Image from "next/image";
import { PropsWithChildren } from "react";

import Title from "./components/title";
import Bio from "./components/bio.mdx";
import Hobbies from "./components/hobbies.mdx";
import Technologies from "./components/technologies.mdx";

export const metadata: Metadata = {
  title: "Adam Fratino",
  description:
    "UX/UI engineer with a background in graphic design, focused on building design systems, scaling component libraries, and all things interactive.",
};

const Paragraph = ({ children }: PropsWithChildren) => (
  <p className="text-paragraph">{children}</p>
);

const ListItem = ({ children }: PropsWithChildren) => (
  <li className="text-sm italic mb-2 last:mb-0">{children}</li>
);

const markdownStyles = {
  p: Paragraph,
  li: ListItem,
};

export default async function Home() {
  return (
    <main className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-auto">
          <div className="sticky top-6">
            <Image
              src="/images/adam-fratino-sipping-a-beverage.jpg"
              alt="Adam Fratino enjoying a tasty beverage"
              width={460}
              height={640}
              className="h-auto rounded-md max-w-full md:w-auto"
            />
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <div className="max-w-xl flex flex-col">
            <Title text="adam fratino" className="lg:-m-1" />

            <h2 className="text-sm font-semibold italic">
              ux & ui engineer with a background in graphic design
            </h2>

            <div className="border-y border-y-black py-5 mt-5 mb-2">
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
              {/* <a href="#" target="_blank">
                blog
              </a> */}
              {/* <a href="https://github.com/adamfratino" target="_blank">github</a> */}
            </div>

            <Technologies components={markdownStyles} />

            <hr className="my-5 h-[1px] border-t border-t-black" />

            <Hobbies components={markdownStyles} />
          </div>
        </div>
      </div>
    </main>
  );
}
