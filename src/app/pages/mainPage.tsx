"use client"
import { useCallback, useState } from "react"
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
    return (
        <>
            <LoadingScreen />
            <div className={'pw-main-page'}>
                <ThemeSwitcher />
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