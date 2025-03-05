import { useCallback } from "react"
import { BlogContentProps } from "../types"
import Image from "next/image";
import { MainHeader, Paragraph, SecondaryText } from "./typography";
import { Button } from "./interactibles";

export const BlogContent = (props: BlogContentProps) => {
    const { blogData, handleNavigationButtonClick, leftButtonDisabled, rightButtonDisabled, returnToIndex } = props;

    const blogNavigator = useCallback(() => {
        return (
            <div className="pw-blogs-page-blog-navigation">
                <div className="pw-blogs-page-blog-navigation-buttons">
                    <Image className={`pw-blogs-page-blog-navigation-buttons-left-button ${leftButtonDisabled ? 'pw-blogs-page-blog-navigation-buttons-button-disabled' : ''} pw-interactible`} src={`/resources/images/icons/leftArrow.webp`} alt={'leftArrow'} height={40} width={40} onClick={() => handleNavigationButtonClick(true)} />
                    <Image className={`pw-blogs-page-blog-navigation-buttons-right-button ${rightButtonDisabled ? 'pw-blogs-page-blog-navigation-buttons-button-disabled' : ''} pw-interactible`} src={`/resources/images/icons/rightArrow.webp`} alt={'rightArrow'} height={40} width={40} onClick={() => handleNavigationButtonClick(false)} />
                </div>
            </div>
        )
    }, [handleNavigationButtonClick, leftButtonDisabled, rightButtonDisabled]);
    return (<div className="pw-blogs-page-blog-content">
        {blogNavigator()}
        <MainHeader textContent={blogData.title} />
        <SecondaryText textContent={blogData.date} />
        <div className="pw-blogs-page-blog-content-paragraph-image-wrap pw-pos-margin-top-large">
            <Image className="pw-blogs-page-blog-content-blog-image" src={`/resources/images/blogs/${blogData.image}`} alt={blogData.image} height={315} width={450} objectFit="contain" />
            <div className="pw-blogs-page-blog-content-paragraph-image-wrap-paragraph-wrap">
                <Paragraph textContent={blogData.description} />
            </div>

        </div>
        <Button buttonLabel="Return to index" buttonCallBack={returnToIndex} className={'pw-blogs-page-blog-navigation-return-button pw-pos-margin-top-large'}/>
    </div>)
}