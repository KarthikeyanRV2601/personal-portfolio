"use client";

import { HoverTriggerProps } from "../types";
import { useHover } from "./hoverProvider";

export default function HoverTrigger({ children }: HoverTriggerProps) {
  const { setIsHovering } = useHover();

  return (
    <div
      className={"p-6 border border-gray-500 rounded-lg cursor-pointer"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </div>
  );
}
