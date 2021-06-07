import cn from "clsx";
import { CSSProperties } from "react";
import { SpacingProps } from "../Spacing/Spacing";
import classes from "./LineDivider.module.scss";

type LineType = "continuous" | "dashed";
interface LineDividerProps {
  type?: LineType;
  width?: number | string;
  marginTop?: number;
  marginBottom?: number;
  spacing?: SpacingProps["size"];
  className?: string;
  style?: CSSProperties;
}

function LineDivider({
  type = "continuous",
  width = "100%",
  marginBottom,
  marginTop,
  spacing = "xxxx-small",
  className,
}: LineDividerProps) {
  return (
    <>
      <hr
        data-testid="line-divider"
        className={cn(classes.line, className)}
        style={{
          width: width,
          marginBottom: marginBottom,
          marginTop: marginTop,
          border: type === "dashed" ? "1px dashed" : undefined,
        }}
      />
    </>
  );
}

export default LineDivider;
