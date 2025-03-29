"use client"
import { TextWrapperProps } from "@/app/types"
import { useEffect, useRef } from "react";

export const MainHeader = (props: TextWrapperProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { textContent } = props;
    useEffect(() => {
        const playGlitchSound = () => {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch((err) => console.error("Audio play error:", err));
            }
        };
        // playGlitchSound();
        const interval = setInterval(playGlitchSound, 10000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="pw-typo-mainheader">
            {textContent}
            <audio ref={audioRef} src="/glitch2.mp3" preload="auto"/>
        </div>
    )
}