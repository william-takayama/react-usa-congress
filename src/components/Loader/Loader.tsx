import cn from "clsx";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  Transition,
} from "framer-motion";
import { CSSProperties } from "react";
import classes from "./Loader.module.scss";

interface LoaderProps {
  isLoading?: boolean;
  width?: number;
  height?: number;
  spinnerWidth?: number;
  spinnerHeight?: number;
  color?: string;
  label?: string;
  radius?: number;
  className?: string;
  style?: CSSProperties;
}

const variants = {
  variants: {
    show: { opacity: 1 },
    hide: { opacity: 0 },
  },
  initial: { opacity: 0 },
};

const transition: Transition = {
  damping: 20,
  type: "spring",
};

export function Loader({
  isLoading = true,
  width,
  height,
  spinnerWidth = 120,
  spinnerHeight = 120,
  color = "#404040",
  label = "Loader",
  radius = 22,
  className,
  style,
}: LoaderProps) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <m.div
          id="loader"
          animate={isLoading ? "show" : "hide"}
          {...variants}
          {...transition}
          className={cn(classes.container, className)}
          style={{
            width,
            height,
            ...style,
          }}
        >
          <svg
            width={spinnerWidth}
            height={spinnerHeight}
            viewBox="0 0 44 44"
            xmlns="http://www.w3.org/2000/svg"
            stroke={color}
            aria-label={label}
          >
            <g fill="none" fillRule="evenodd" strokeWidth="2">
              <circle cx="22" cy="22" r={radius}>
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="strokeOpacity"
                  begin="0s"
                  dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="22" cy="22" r={radius}>
                <animate
                  attributeName="r"
                  begin="-0.9s"
                  dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="strokeOpacity"
                  begin="-0.9s"
                  dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
