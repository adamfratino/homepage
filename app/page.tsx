import type { Metadata } from "next";
import Image from "next/image";
import { PropsWithChildren } from "react";

import Photo from "./components/photo";
import Details from "./components/details";

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
          <Photo />
        </div>

        <div className="w-full lg:w-auto">
          <Details />
        </div>
      </div>
    </main>
  );
}
