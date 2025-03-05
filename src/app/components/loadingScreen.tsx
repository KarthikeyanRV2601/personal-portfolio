"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { Paragraph } from "./typography";

export default function LoadingScreen(props: { isVisible: boolean, setIsVisible: (a: boolean) => void }) {
  const { isVisible, setIsVisible } = props;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [displayButton, setDisplayButton] = useState(true);


  const playScreen = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio play error:", err));
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      setDisplayButton(false);
      document.removeEventListener("click", playScreen);
    }
  }, [setIsVisible]);

  useEffect(() => {
    document.addEventListener("click", playScreen);
    return () => {
      document.removeEventListener("click", playScreen);
    };
  }, [playScreen]);

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
