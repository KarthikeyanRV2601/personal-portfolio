import { useCallback } from "react";
import { BlogData, BlogIndexProps } from "../types"
import { MainHeader, Paragraph, SecondaryText } from "./typography";

export const BlogIndex = (props: BlogIndexProps) => {
    const { blogsData, setCurrentBlogIndex, setShowIndex } = props;

    const blogIndexItem = (blogData: BlogData) => {
        return (
            <>
                <div className="pw-blogs-page-blog-index-list-item-title pw-interactible"><Paragraph textContent={blogData.title} bold/></div>
                <SecondaryText textContent={blogData.date} />
            </>
        )
    }

    const handleListItemClick = useCallback((index: number) => {
        setCurrentBlogIndex(index)
        setShowIndex(false);
    }, [setCurrentBlogIndex, setShowIndex])

    return (<div className="pw-blogs-page-blog-index">
        <MainHeader textContent={'Index'} />
        <ul className="pw-blogs-page-blog-index-list">
            {
                blogsData.map((blogData, index) => <li key={index} className="pw-blogs-page-blog-index-list-item" onClick={() => handleListItemClick(index)}>
                    {blogIndexItem(blogData)}
                </li>)
            }
        </ul>
    </div>)
}