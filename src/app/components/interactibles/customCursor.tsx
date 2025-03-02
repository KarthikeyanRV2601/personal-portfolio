"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
            });
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '9999px',
                backgroundColor: 'grey',
                mixBlendMode: 'difference',
                transitionProperty: 'transform',
                transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                transitionDuration: '200ms',
                pointerEvents: 'none',
                left: position.x,
                top: position.y,
                transform: "translate(-50%, -50%)",
                zIndex: "999999"
            }}
        />
    );
};

export default CustomCursor;
