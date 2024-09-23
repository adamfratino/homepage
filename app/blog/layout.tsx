import type { PropsWithChildren } from "react";

export default function BlogLayout({ children }: PropsWithChildren) {
  return <main className="p-6">{children}</main>;
}
