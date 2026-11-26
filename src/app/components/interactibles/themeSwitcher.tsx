"use client";

import { useEffect } from "react";

export default function ThemeSwitcher(props: { darkMode: boolean; setDarkMode: (a: boolean) => void }) {
  const { darkMode, setDarkMode } = props;

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = localStorage.getItem("theme");
    } catch {
      // The theme still works when browser storage is unavailable.
    }
    const useDarkTheme = savedTheme !== "light";
    document.body.classList.toggle("pw-dark-mode", useDarkTheme);
    setDarkMode(useDarkTheme);
  }, [setDarkMode]);

  const toggleTheme = () => {
    const useDarkTheme = !darkMode;
    document.body.classList.toggle("pw-dark-mode", useDarkTheme);
    setDarkMode(useDarkTheme);
    try {
      localStorage.setItem("theme", useDarkTheme ? "dark" : "light");
    } catch {
      // Keep the selected theme for this visit even without persistent storage.
    }
  };

  return (
    <button
      type="button"
      className="pw-theme-toggle"
      onClick={toggleTheme}
      aria-pressed={darkMode}
      aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
      title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="pw-theme-toggle-icon" aria-hidden="true">
        {darkMode ? (
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 4a1 1 0 011 1v1.2a1 1 0 11-2 0V5a1 1 0 011-1zm0 12a4 4 0 100-8 4 4 0 000 8zm8-5a1 1 0 100 2h-1.2a1 1 0 100-2H20zM6.2 11a1 1 0 100 2H5a1 1 0 100-2h1.2zm10.95-4.54a1 1 0 011.41 0l.85.85a1 1 0 11-1.41 1.41l-.85-.84a1 1 0 010-1.42zm-12.56 12.6a1 1 0 011.41 0l.85.84a1 1 0 01-1.41 1.42l-.85-.85a1 1 0 010-1.41zm13.41 1.42a1 1 0 01-1.41 0l-.85-.85a1 1 0 011.41-1.41l.85.84a1 1 0 010 1.42zm-12.56-12.6a1 1 0 010 1.41l-.85.85A1 1 0 013.18 8.7l.84-.84a1 1 0 011.42 0z"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14.76 3.2a1 1 0 01.75 1.4A8.6 8.6 0 1019.4 15a1 1 0 011.4.74 1 1 0 01-.74 1.1 10.6 10.6 0 11-6.4-13.7c.4-.1.8 0 1.1.06z"
            />
          </svg>
        )}
      </span>
      <span className="pw-theme-toggle-label">{darkMode ? "Light Mode" : "Dark Mode"}</span>
      <span className="pw-theme-toggle-hint">{darkMode ? "Sun" : "Moon"}</span>
    </button>
  );
}
