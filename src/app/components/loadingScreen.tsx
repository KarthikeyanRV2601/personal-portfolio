"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { Paragraph } from "./typography";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [displayButton, setDisplayButton] = useState(true);


  const playScreen = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio play error:", err));
      setTimeout(() => {
        setIsVisible(false);
      }, 2500);
      setDisplayButton(false);
      document.removeEventListener("click", playScreen);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", playScreen);
    return () => {
      document.removeEventListener("click", playScreen);
    };
  }, []);

  return (
    <div className={`pw-loading-screen ${!isVisible ? "pw-hidden" : ""}`}>
      {
        displayButton ? <Paragraph textContent="Click on the screen" /> :
          <>
            <span className={"pw-loading-text"}>Karthikeyan R V - Personal portfolio</span>
          </>

      }
      <audio src="/whoosh-smooth.mp3" preload="auto" ref={audioRef} />
    </div>
  );
}
