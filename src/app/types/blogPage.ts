export interface BlogData {
    title: string;
    date: string;
    description: string;
    image: string;
}

export interface BlogIndexProps {
    blogsData: BlogData[];
    setCurrentBlogIndex: (index: number) => void;
    setShowIndex: (flag: boolean) => void;

}

export interface BlogContentProps {
    blogData: BlogData;
    handleNavigationButtonClick: (left: boolean) => void;
    setShowIndex: (flag: boolean) => void;
    leftButtonDisabled: boolean;
    rightButtonDisabled: boolean;
    returnToIndex: () => void;
}