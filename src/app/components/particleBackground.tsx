"use client"; // Ensures it runs only on the client

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const ParticleBackground = ({ isDarkMode }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("vanta/dist/vanta.net.min").then((VANTA) => {
        if (vantaEffect) vantaEffect.destroy();

        setVantaEffect(
          VANTA.default({
            el: vantaRef.current,
            THREE: THREE,
            color: isDarkMode ? 0xffffff : 0x0000ff,
            backgroundColor: isDarkMode ? 0x000000 : 0xffffff,
            points: 10.0,
            maxDistance: 20.0,
            spacing: 15.0,
          })
        );
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [isDarkMode]); // Re-run when theme changes

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};
