import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  id: string;
  className?: string;
}

export function Portal({
  id,
  children,
  className,
}: PropsWithChildren<PortalProps>): JSX.Element | null {
  const [mounted, setMounted] = useState<boolean>(false);
  const container = useRef<Element | null>(null);

  useEffect(() => {
    let element = document.querySelector(`#${id}`);

    if (element == null) {
      element = document.createElement("div");
      element.id = id;
      element.className = className ?? "";
      document.body.appendChild(element);
    }

    container.current = element;
    setMounted(true);
  }, [className, id]);

  if (!mounted || container.current == null) {
    return null;
  }

  return createPortal(children, container.current, id);
}
