import { execSync } from "node:child_process";

import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/** When the site last changed: the latest commit's time, or the build time when git is unavailable. */
function siteUpdatedAt(): string {
  try {
    return execSync("git log -1 --format=%cI", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return new Date().toISOString();
  }
}

const nextConfig: NextConfig = {
  env: { SITE_UPDATED_AT: siteUpdatedAt() },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

/** Plugins are named by string because Turbopack can't take functions. They turn each note's YAML frontmatter into a `frontmatter` export. */
const withMDX = createMDX({
  options: { remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"] },
});

export default withMDX(nextConfig);
