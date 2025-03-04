"use client"
import { useEffect } from "react";

export default function ThemeSwitcher(props: { darkMode: boolean, setDarkMode: (a: boolean) => void }) {
    const { darkMode, setDarkMode } = props;
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("pw-dark-mode");
            setDarkMode(true);
        }
    }, [setDarkMode]);

    const toggleTheme = () => {
        if (darkMode) {
            document.body.classList.remove("pw-dark-mode");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.add("pw-dark-mode");
            localStorage.setItem("theme", "dark");
        }
        setDarkMode(!darkMode);
    };

    return (
        <button className={"pw-theme-toggle"} onClick={toggleTheme}>
            {darkMode ? "🌞" : "🌙"}
        </button>
    );
}
