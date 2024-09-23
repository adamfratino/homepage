import type { Metadata } from "next";
import Link from "next/link";

import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Adam Fratino's Blog",
  description:
    "This is my blog about my experiences as a software engineer with a background in design. There are many others like it, but this one is mine. My blog is my best friend. It is my life.",
};

export default async function Home() {
  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <div key={post.path}>
          <time dateTime={post.date.toString()}>
            {post.date.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </time>
          <Link href={`/blog/${post.path}`}>
            <h2 className="text-xl md:text-3xl mb-1">{post.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
