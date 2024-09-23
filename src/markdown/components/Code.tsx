import type { PropsWithChildren } from "react";

export const Pre = ({ children }: PropsWithChildren) => (
  <pre className="rounded-md p-2 sm:p-4 my-6 last:mb-0 font-semibold border border-gray-200 text-sm">
    {children}
  </pre>
);
