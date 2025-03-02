import { TextWrapperProps } from "@/app/types"

export const MainHeader = (props: TextWrapperProps) => {
    const { textContent } = props;
    return (
        <div className="pw-typo-mainheader">
            {textContent}
        </div>
    )
}