import type { PropsWithChildren } from "react";

const Anchor = ({ children, ...props }: PropsWithChildren) => (
  <a target="_blank" {...props}>
    {children}
  </a>
);

export default Anchor;
