"use client"
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  }, []);

  return (
    <div className={`pw-loading-screen ${!isVisible ? "pw-hidden" : ""}`}>
      <span className={"pw-loading-text"}>Karthikeyan R V - Personal portfolio</span>
    </div>
  );
}
