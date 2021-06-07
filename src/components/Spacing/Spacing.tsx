import cn from "clsx";
import classes from "./Spacing.module.scss";

export interface SpacingProps {
  type: "block" | "inline";
  size:
    | "xxxx-small"
    | "xxx-small"
    | "xx-small"
    | "x-small"
    | "small"
    | "regular"
    | "large"
    | "x-large"
    | "xx-large";
  className?: string;
}

export function Spacing({ type, size, className }: SpacingProps) {
  return (
    <div
      className={cn(classes.container, classes[size], classes[type], className)}
    />
  );
}
