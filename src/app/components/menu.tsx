import { useCallback } from "react";
import { rootTranslations } from "../resources"
import { MainPageTabs } from "../types"
import { MenuProps, MenuTab } from "../types"

export const Menu = (props: MenuProps) => {
    const { currentMainPageTab, setCurrentMainPageTab } = props;

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
        <ul className="pw-menu-ul">
            {menuTabs.map((tab, index) => <li key={index} className={`pw-menu-li ${currentMainPageTab === tab.id ? 'pw-menu-li-active' : ''}`} onClick={() => handleOnClick(tab)}>{tab.value}</li>)}
        </ul>
    )
}