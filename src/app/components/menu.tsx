"use client"
import { useCallback, useEffect, useRef } from "react";
import { rootTranslations } from "../resources"
import { MainPageTabs } from "../types"
import { MenuProps, MenuTab } from "../types"

export const Menu = (props: MenuProps) => {
    const { currentMainPageTab, setCurrentMainPageTab } = props;
    const audioRef = useRef<HTMLAudioElement | null>(null);
    useEffect(() => {
        const playGlitchSound = () => {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch((err) => console.error("Audio play error:", err));
            }
        };
        playGlitchSound();
    }, [currentMainPageTab]);

    const menuTabs: MenuTab[] = [
        {
            id: MainPageTabs.ABOUT_ME,
            value: rootTranslations.labels.aboutMe
        },
        {
            id: MainPageTabs.EXPERIENCE,
            value: rootTranslations.labels.experience
        },
        {
            id: MainPageTabs.PROJECTS,
            value: rootTranslations.labels.projects
        },
        {
            id: MainPageTabs.BLOGS,
            value: rootTranslations.labels.blogs
        },
        {
            id: MainPageTabs.RESUME,
            value: rootTranslations.labels.resume
        },
        {
            id: MainPageTabs.CONTACT,
            value: rootTranslations.labels.contact
        }
    ];

    const handleOnClick = useCallback((tab: MenuTab) => {
        setCurrentMainPageTab(tab.id);
    }, [setCurrentMainPageTab]);

    return (
        <>
            <ul className="pw-menu-ul">
                {menuTabs.map((tab, index) => <li key={index} className={`pw-menu-li ${currentMainPageTab === tab.id ? 'pw-menu-li-active' : ''}`} onClick={() => handleOnClick(tab)}>{tab.value}</li>)}
            </ul>
            <audio ref={audioRef} src="/glitch2.mp3" preload="auto" />
        </>

    )
}