import cn from "clsx";
import parse from "html-react-parser";
import { CSSProperties, ReactNode, Ref } from "react";
import { Loader } from "../Loader/Loader";
import { Spacing } from "../Spacing/Spacing";
import classes from "./Button.module.scss";

interface ButtonBaseProps {
  variant?: "dark" | "light";
  size?: "xx-small" | "x-small" | "small" | "regular" | "large";
  disabled?: boolean;
  type?: "button" | "submit" | "plain";
  href?: string;
  bordered?: boolean;
  borderRadius?: string | number;
  onClick?: (event: any) => void;
  fluid?: boolean;
  loading?: boolean;
  target?: "_blank";
  lastIcon?: ReactNode;
  _ref?: Ref<HTMLButtonElement | HTMLAnchorElement | any>;
  spacing?: "regular" | "none";
  className?: string;
  style?: CSSProperties;
}

type ButtonIconProps =
  | {
      icon: ReactNode;
      iconPosition: "leading" | "trailing" | "only";
    }
  | {
      icon?: never;
      iconPosition?: never;
    };

type ButtonTextProps =
  | { children?: never; text?: string | undefined }
  | { text?: never | undefined | string; children?: ReactNode };

export type ButtonProps = ButtonBaseProps & ButtonIconProps & ButtonTextProps;

export function Button({
  variant = "dark",
  type = "button",
  size = "regular",
  href,
  target,
  disabled,
  iconPosition,
  icon,
  lastIcon,
  text,
  children,
  bordered = true,
  borderRadius,
  className,
  fluid,
  loading,
  _ref,
  spacing = "regular",
  style,
  ...props
}: ButtonProps) {
  const isLink = href != null;

  const Tag = isLink ? "a" : "button";

  return (
    <Tag
      {...props}
      ref={_ref}
      type={type === "plain" ? "button" : type}
      href={isLink ? href : undefined}
      target={target}
      rel={target ? "noreferrer" : undefined}
      className={cn(
        classes.button,
        classes[`variant-${variant}`],
        classes[`type-${type}`],
        classes[`spacing-${spacing}`],
        classes[`size-${size}`],
        {
          [classes.onlyIcon]: icon != null && iconPosition === "only",
          [classes.bordered]: bordered,
          [classes.fluid]: fluid,
          [classes.loading]: loading,
        },
        className
      )}
      aria-label={`${type}-${text}`}
      disabled={disabled}
      style={{ borderRadius, ...style }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {icon && iconPosition === "leading" ? (
            <>
              {icon}
              <Spacing type="inline" size="xx-small" />
            </>
          ) : null}

          {icon && iconPosition === "only"
            ? icon
            : text
            ? parse(`<span>${text}</span>`)
            : children}

          {icon && iconPosition === "trailing" ? (
            <>
              <Spacing type="inline" size="xx-small" />
              {icon}
            </>
          ) : null}
          {icon && lastIcon ? (
            <>
              <Spacing type="inline" size="xx-small" />
              {lastIcon}
            </>
          ) : null}
        </>
      )}
    </Tag>
  );
}
