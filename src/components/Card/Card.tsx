import { Property } from "csstype";
import { CSSProperties, PropsWithChildren } from "react";
import classes from "./Card.module.scss";
import cn from "clsx";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  Transition,
  Variants,
} from "framer-motion";

interface CardProps {
  width?: number | string;
  height?: number | string;
  borderRadiusSize?: "small" | "medium" | "large";
  color?: string;
  image?: string;
  onClick?: (args: any) => void;
  className?: string;
  style?: CSSProperties;
}

interface CardContentProps {
  stretch?: boolean;
  textColor?: string;
  justifyContent?: Property.JustifyContent;
  alignItems?: Property.AlignItems;
  alignDirection?: Property.FlexFlow;
  textAlign?: Property.TextAlign;
  className?: string;
  style?: CSSProperties;
}

const variants: Variants = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

const transition: Transition = {
  damping: 40,
  type: "spring",
};

export function Card({
  width = "100%",
  height,
  borderRadiusSize = "small",
  color = "var(--color-x-contrast)",
  image,
  onClick,
  children,
  className,
  style,
}: PropsWithChildren<CardProps>) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <m.div
          data-role={!!onClick && "button"}
          onClick={onClick}
          {...variants}
          {...transition}
          className={cn(classes.card, classes[borderRadiusSize], className, {
            [classes.buttonRole]: !!onClick,
          })}
          style={{
            height,
            width,
            backgroundColor: color,
            backgroundImage: `url(${image})`,
            ...style,
          }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}

export function CardContent({
  textColor = "var(--color-primary)",
  alignDirection,
  textAlign,
  alignItems,
  justifyContent,
  stretch = true,
  className,
  style,
  children,
}: PropsWithChildren<CardContentProps>) {
  return (
    <div
      className={cn(classes.content, className)}
      style={{
        justifyContent,
        alignItems,
        flex: stretch ? 1 : 0,
        flexFlow: alignDirection,
        textAlign,
        color: textColor,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
