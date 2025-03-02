"use client"
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("pw-dark-mode");
            setDarkMode(true);
        }
    }, []);

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
