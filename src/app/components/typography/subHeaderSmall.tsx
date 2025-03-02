import { TextWrapperProps } from "@/app/types"

export const SubHeaderSmall = (props: TextWrapperProps) => {
    return (
        <p className="pw-typo-subheader-small">
            {props.textContent}
        </p>
    )
}