import TailwindLayout from "./tailwind-layout-components.mdx";
import DutyNow from "./duty-now-for-the-future.mdx";

const posts = [
  {
    date: new Date("2024-09-22"),
    title:
      "Building a low-level layout library with Tailwind, because why not?",
    description: "Should I use Tailwind or a Component Library? Yes.",
    path: "tailwind-layout-components",
    component: TailwindLayout,
  },
  {
    date: new Date("2024-09-22"),
    title: "Duty now, for the future",
    description:
      "A great DEVO album, and also a great way to approach the way you code.",
    path: "duty-now-for-the-future",
    component: DutyNow,
  },
];

export { posts };
