"use client"
import { TextWrapperProps } from "@/app/types"

export const MainHeader = (props: TextWrapperProps) => {
    const { textContent, link } = props;
    return (
        <div className="pw-typo-mainheader">
            {
                link ? (
                    <a href={link} target="_blank" rel="noreferrer" className="pw-typo-mainheader">{textContent}</a>
                ) : (
                    textContent
                )
            }
        </div>
    )
}
