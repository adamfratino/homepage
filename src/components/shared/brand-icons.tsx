import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type SVGProps,
} from "react";
import { Github, Linkedin } from "@thesvg/react";
import type { Icon, IconProps } from "@uiid/design-system/icons";

type BrandSvg = ForwardRefExoticComponent<SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>>;

/**
 * Adapts a `@thesvg/react` brand mark to the design system's `Icon` contract
 * so it can be passed anywhere a uiid icon is expected (e.g. `ListItem.icon`).
 * Maps `size` to width/height, marks the element so globals.css can strip the
 * hardcoded brand fill, and hides it from assistive tech since it always sits
 * next to a text label.
 */
function brandIcon(displayName: string, Svg: BrandSvg): Icon {
  const BrandIcon = forwardRef<SVGSVGElement, IconProps>(
    ({ size = 16, absoluteStrokeWidth, ...props }, ref) => {
      // Lucide-only prop; keep it off the DOM. Brand marks are filled shapes.
      void absoluteStrokeWidth;
      return (
        <Svg
          ref={ref}
          width={size}
          height={size}
          aria-hidden="true"
          focusable="false"
          data-brand-icon=""
          {...props}
        />
      );
    },
  );
  BrandIcon.displayName = displayName;
  return BrandIcon;
}

export const GithubIcon = brandIcon("GithubIcon", Github);
export const LinkedinIcon = brandIcon("LinkedinIcon", Linkedin);
