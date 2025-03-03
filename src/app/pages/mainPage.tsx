"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import { MainPageTabs } from "../types";
import { AboutMePage } from "./aboutMePage";
import '../styles/main.css'
import { Menu } from "../components/menu";
import { ExperiencePage } from "./experiencePage";
import { ProjectsPage } from "./projectsPage";
import { BlogsPage } from "./blogsPage";
import { ResumePage } from "./resumePage";
import { ContactPage } from "./contactPage";
import LoadingScreen from "../components/loadingScreen";
import ThemeSwitcher from "../components/interactibles/themeSwitcher";

export const MainPage = () => {

    const [currentMainPageTab, setCurrentMainPageTab] = useState(MainPageTabs.ABOUT_ME);
    const [darkMode, setDarkMode] = useState(false);

    const renderContent = useCallback(() => {
        switch (currentMainPageTab) {
            case MainPageTabs.ABOUT_ME: return <AboutMePage />;
            case MainPageTabs.EXPERIENCE: return <ExperiencePage />;
            case MainPageTabs.PROJECTS: return <ProjectsPage />;
            case MainPageTabs.BLOGS: return <BlogsPage />;
            case MainPageTabs.RESUME: return <ResumePage />;
            case MainPageTabs.CONTACT: return <ContactPage />;
        }
    }, [currentMainPageTab])

    const particleContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const particleContainer = particleContainerRef.current;
        if (!particleContainer) return;

        // Clear existing particles before regenerating
        particleContainer.innerHTML = "";

        const particleCount = 150; // Adjust for density
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");

            // Random Positioning (Full Screen)
            particle.style.top = Math.random() * 100 + "vh";
            particle.style.left = Math.random() * 100 + "vw";

            // Random Size
            const size = Math.random() * 4 + 1; // Between 1px - 5px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random Animation Duration & Delay
            particle.style.animationDuration = Math.random() * 5 + 5 + "s"; // Between 5s - 10s
            particle.style.animationDelay = Math.random() * 3 + "s"; // Random delay

            // Append to container
            particleContainer.appendChild(particle);
        }
    }, [darkMode]); // Regenerate particles when theme changes

    return (
        <>
            <LoadingScreen />
            <div className={`pw-particles-container ${darkMode ? 'dark' : 'light'}`}>
                <div ref={particleContainerRef} className="particles-container"></div>
            </div>
            <div className={'pw-main-page'}>
                <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
                <Menu currentMainPageTab={currentMainPageTab} setCurrentMainPageTab={setCurrentMainPageTab} />
                <div className={'pw-main-content-renderer'}>
                    {
                        renderContent()
                    }
                </div>
            </div>
        </>
    )
}