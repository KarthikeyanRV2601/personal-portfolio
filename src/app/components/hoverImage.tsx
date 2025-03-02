"use client";
import { useHover } from "./hoverProvider";
import { HoverImageProps } from "../types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HoverImage({ srcs, alt }: HoverImageProps) {
  const { position, isHovering } = useHover();
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState('');

  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isHovering && count > 0) {
      setSrc(`/resources/images/projects/${srcs[Math.floor(Math.random() * srcs.length)]}`)
      setVisible(true);
    } else {
      setVisible(false)
    }
  }, [isHovering, srcs, count]);

  if (!isHovering) return null;
  return (
    visible && <div
      style={{
        pointerEvents: "none",
        position: 'absolute',
        left: `${position.x - 300}px`,
        top: `${position.y - 100}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Image
        src={src}
        alt={alt || ''}
        width={500}
        height={600}
        className="rounded-lg shadow-lg pw-hover-component-hover-image"
      />
    </div>
  );
}
