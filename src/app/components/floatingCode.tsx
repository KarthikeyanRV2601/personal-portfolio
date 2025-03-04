"use client";
import React, { useEffect, useState } from "react";
import dynamicBackgroundData from '../data/pageDynamicBackground.json';
import { CodeSnippet } from "../types";

export const FloatingCode = (props: { theme: "light" | "dark" }) => {
    const codeSnippets = dynamicBackgroundData.codeSnippets;
    const [codes, setCodes] = useState<CodeSnippet[]>([]);
    const { theme } = props;

    useEffect(() => {
        const createCode = () => {
            const code = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            return { id: Date.now(), text: code, top: Math.random() * 100, left: 5 };
        };

        const interval = setInterval(() => {
            setCodes((prev) => [...prev, createCode()].slice(-5));
        }, 2000);

        return () => clearInterval(interval);
    }, [theme]);

    return (
        <div className="floating-code-container">
            {codes.map((code) => (
                <span
                    key={code.id}
                    className={`code-line ${theme} glitch`}
                    style={{ top: `${code.top}vh`, left: `${code.left}vw` }}
                >
                    {code.text}
                </span>
            ))}
        </div>
    );
};
