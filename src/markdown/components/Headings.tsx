import type { PropsWithChildren } from "react";

export const Subheading = ({ children }: PropsWithChildren) => (
  <h3 className="font-bold text-lg leading-tight py-4 border-y border-y-black my-6">
    {children}
  </h3>
);
