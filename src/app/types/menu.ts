import { MainPageTabs } from "./mainPageTabs";

export interface MenuTab {
    id: MainPageTabs;
    value: string;
}

export interface MenuProps {
    currentMainPageTab: MainPageTabs;
    setCurrentMainPageTab: (tab: MainPageTabs) => void
}