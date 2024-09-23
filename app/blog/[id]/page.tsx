import { notFound } from "next/navigation";

import { markdownStyles, Paragraph } from "@/src/markdown";

import { posts } from "../posts";
import { PropsWithChildren } from "react";

interface BlogPost {
  params: { id: string };
}

export function generateStaticParams() {
  return posts.map((post) => ({
    id: post.path,
  }));
}

export function generateMetadata({ params }: BlogPost) {
  const post = posts.find((post) => post.path === params.id);

  return {
    title: `${post!.title} - by Adam Fratino`,
    description: post!.description,
  };
}

const BlogParagraph = ({ children }: PropsWithChildren) => (
  <Paragraph className="md:pl-6">{children}</Paragraph>
);

const blogMarkdownStyles = {
  ...markdownStyles,
  p: BlogParagraph,
};

export default function BlogPost({ params }: BlogPost) {
  const post = posts.find((post) => post.path === params.id);

  if (!post) notFound();

  const PostComponent = post.component;

  return (
    <article className="max-w-3xl">
      <time dateTime={post.date.toString()} className="font-semibold">
        {post.date.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </time>

      <h1 className="text-2xl md:text-4xl font-bold mt-2 mb-6">{post.title}</h1>

      <article>
        <PostComponent components={blogMarkdownStyles} />
      </article>
    </article>
  );
}
