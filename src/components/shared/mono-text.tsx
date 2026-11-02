import { Text, type TextProps } from "@uiid/design-system";

/** Small, subtle monospace text used for the "now playing" rows. */
export function MonoText({ children, ...props }: TextProps) {
  return (
    <Text {...props} family="mono" size={-1}>
      {children}
    </Text>
  );
}
