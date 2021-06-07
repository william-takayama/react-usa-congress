import classes from "./BottomSheet.module.scss";
import cn from "clsx";
import {
  MouseEvent,
  PropsWithChildren,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Portal } from "../Portal/Portal";
import { usePreventPageScroll } from "../../hooks/usePreventPageScroll";

interface BottomSheetProps {
  id: string;
  isVisible: boolean;
  onDismiss: () => void;
  threshold?: number;
  className?: string;
  contentClassName?: string;
}

export function BottomSheet({
  id,
  isVisible,
  onDismiss,
  threshold = 50,
  className,
  contentClassName,
  children,
  ...props
}: PropsWithChildren<BottomSheetProps>) {
  const [dragging, setDragging] = useState(false);
  const [y, setY] = useState(100);
  const container = useRef<HTMLDivElement | null>(null);
  const startY = useRef(0);
  const containerHeight = useRef(0);

  usePreventPageScroll(isVisible, id);

  useEffect(() => {
    setY(isVisible ? 0 : 100);

    if (isVisible === false) {
      setDragging(false);
    }
  }, [isVisible]);

  function onStart(event: MouseEvent | TouchEvent) {
    setDragging(true);

    const y = "touches" in event ? event.touches[0].clientY : event.clientY;

    if (container.current == null) {
      return;
    }

    startY.current = y;
    containerHeight.current = container.current.clientHeight;
  }

  function onEnd() {
    setDragging(false);

    if (y > threshold) {
      onDismiss();
    } else {
      setY(0);
    }
  }

  function onMove(
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) {
    if (dragging === false) {
      return;
    }

    let eventY = 0;

    if ("touches" in event) {
      const touch = event.touches[0];

      eventY = touch.clientY;
    } else {
      eventY = event.clientY;
    }

    const diff = eventY - startY.current;

    const y = Math.max(0, Math.round((diff * 100) / containerHeight.current));

    setY(y);
  }

  return (
    <Portal id={id}>
      <div
        className={cn(classes.container, className, {
          [classes.isVisible]: isVisible,
        })}
        style={{
          transform: `translateY(${y}%)`,
          transition: dragging ? "" : `transform .3s ease`,
        }}
        onMouseDown={onStart}
        onTouchStart={onStart}
        onTouchEnd={onEnd}
        onMouseUp={onEnd}
        onTouchMove={onMove}
        onMouseMove={onMove}
        ref={container}
      >
        <div className={classes.grabber} />
        <div className={cn(classes.content, contentClassName)} {...props}>
          {isVisible && children}
        </div>
      </div>

      <div
        className={cn(classes.overlay, {
          [classes.isVisible]: isVisible,
        })}
        onClick={onDismiss}
      />
    </Portal>
  );
}
