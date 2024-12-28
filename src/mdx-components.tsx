import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: ({ children }) => (
      <h2 className="mb-6 text-3xl font-semibold">{children}</h2>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 text-lg font-semibold">{children}</h4>
    ),
    p: ({ children }) => <p className="my-4">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc flex flex-col ml-4">{children}</ul>
    ),
    hr: () => <></>,
  };
}
