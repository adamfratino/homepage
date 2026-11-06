import { Text, type TextProps } from "@uiid/design-system";

/** Small, subtle monospace text used for the "now playing" rows. */
export function HobbiesText({ children, ...props }: TextProps) {
  return (
    <Text {...props} size={-1}>
      {children}
    </Text>
  );
}
