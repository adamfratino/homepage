import {
  CollapsiblePanel,
  CollapsibleRoot,
  CollapsibleTrigger,
  Stack,
  Text,
} from "@uiid/design-system";
import { ChevronRightIcon } from "@uiid/design-system/icons/chevron-right";

import { SPACING_MD, SPACING_SM } from "@/constants/ui";

/** How far a section's content sits in from its heading. */
const INDENT = SPACING_SM;
/** Layout hack to prevent hidden trigger outline on focus*/
const OUTLINE_ROOM = SPACING_SM;

type SectionProps = {
  title: string;
  /** Start collapsed. Sections are open unless told otherwise. */
  defaultOpen?: boolean;
  children: React.ReactNode;
};

/** A titled homepage section whose heading toggles its content. */
export function Section({ title, defaultOpen = true, children }: SectionProps) {
  return (
    <CollapsibleRoot
      render={<Stack render={<section />} gap={SPACING_SM} />}
      defaultOpen={defaultOpen}
    >
      <h3>
        <CollapsibleTrigger
          render={
            <Text
              render={<button type="button" />}
              weight="bold"
              size={-1}
              emphasis="subtle"
            />
          }
          className="group inline-flex cursor-pointer items-center gap-1 [&_svg]:size-3 data-[panel-open]:[&_svg]:rotate-90"
        >
          <span className="group-hover:underline">{title}</span>
          <ChevronRightIcon aria-hidden />
        </CollapsibleTrigger>
      </h3>
      <CollapsiblePanel ay="start" gap={SPACING_SM} p={OUTLINE_ROOM} m={OUTLINE_ROOM * -1} ml={INDENT} mb={SPACING_SM}>
        {children}
      </CollapsiblePanel>
    </CollapsibleRoot>
  );
}
