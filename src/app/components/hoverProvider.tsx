"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { CursorPosition, HoverContextType } from "../types";

const HoverContext = createContext<HoverContextType | null>(null);

export function HoverProvider({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.pageX, y: e.pageY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <HoverContext.Provider value={{ position, isHovering, setIsHovering }}>
      {children}
    </HoverContext.Provider>
  );
}

export function useHover() {
  const context = useContext(HoverContext);
  if (!context) throw new Error("useHover must be used within HoverProvider");
  return context;
}
