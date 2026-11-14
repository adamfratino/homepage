"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { ToggleButton } from "@uiid/design-system";
import {
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
} from "@uiid/design-system/icons";

import { anySectionOpenAtom, setAllSectionsOpenAtom } from "@/atoms/sections";

/** Collapses every homepage section. Pressed once none are open, when it expands them all. */
export function SectionsToggle() {
  const anyOpen = useAtomValue(anySectionOpenAtom);
  const setAllOpen = useSetAtom(setAllSectionsOpenAtom);

  return (
    <ToggleButton
      variant="ghost"
      size="xsmall"
      pressed={!anyOpen}
      onPressedChange={(pressed) => setAllOpen(!pressed)}
      icon={{
        pressed: <ChevronsUpDownIcon aria-hidden />,
        unpressed: <ChevronsDownUpIcon aria-hidden />,
      }}
      // text={{ pressed: "Expand all", unpressed: "Collapse all" }}
    />
  );
}
