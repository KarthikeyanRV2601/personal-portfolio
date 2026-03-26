"use client"
import { TextWrapperProps } from "@/app/types"

export const MainHeader = (props: TextWrapperProps) => {
    const { textContent, link } = props;
    return (
        <div className="pw-typo-mainheader">
            <a href={link} target="_blank"
                className="pw-typo-mainheader">{textContent}</a>
        </div>
    )
}