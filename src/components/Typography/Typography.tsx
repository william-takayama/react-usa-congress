import { CSSProperties, PropsWithChildren } from "react";
import { TypographyType } from "../../types/Typography";
import { Property } from "csstype";

interface TypographyProps {
  type: TypographyType;
  weight?: number;
  height?: number;
  italic?: boolean;
  spaced?: boolean;
  size?: number;
  align?: Property.TextAlign;
  className?: string;
  style?: CSSProperties;
}

const ELEMENTS: Record<TypographyType, any> = {
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  heading4: "h4",
  heading5: "h5",
  heading6: "h6",
  "body-heading": "h6",
  body: "p",
};

export function Typography({
  type = "body",
  weight,
  height,
  italic,
  size,
  align = "center",
  spaced,
  children,
  className,
  style,
  ...props
}: PropsWithChildren<TypographyProps>): JSX.Element {
  const Tag = ELEMENTS[type];

  return (
    <Tag
      {...props}
      className={className}
      style={{
        textAlign: align,
        fontWeight: weight,
        fontSize: size,
        lineHeight: height,
        fontStyle: italic ? "italic" : "normal",
        margin: !spaced && 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
