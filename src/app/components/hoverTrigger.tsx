"use client";

import { HoverTriggerProps } from "../types";
import { useHover } from "./hoverProvider";

export default function HoverTrigger({ children }: HoverTriggerProps) {
  const { setIsHovering } = useHover();

  return (
    <div
      className={"pw-project-page-hover-trigger"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </div>
  );
}
