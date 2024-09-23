import type { PropsWithChildren } from "react";

import { cn } from "@/src/utils/cn";

type ParagraphProps = PropsWithChildren<{
  className?: string;
}>;

const Paragraph = ({ className, children }: ParagraphProps) => (
  <p className={cn("text-paragraph tracking-tight md:text-lg", className)}>
    {children}
  </p>
);

export default Paragraph;
