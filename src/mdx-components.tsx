import type { MDXComponents } from "mdx/types";

/**
 * MDX renders plain HTML elements, and `Prose` from the design system styles
 * them, so no element overrides are needed here. Next.js still requires this
 * file to exist for MDX to work in the App Router.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
