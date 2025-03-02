import { TextWrapperProps } from "@/app/types"

export const SecondaryText = (props: TextWrapperProps) => {
    return (
        <p className="pw-typo-secondary-text">
            {props.textContent}
        </p>
    )
}