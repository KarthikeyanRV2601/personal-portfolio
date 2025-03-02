import { TextWrapperProps } from "@/app/types"

export const SubHeader = (props: TextWrapperProps) => {
    return (
        <p className="pw-typo-subheader">
            {props.textContent}
        </p>
    )
}