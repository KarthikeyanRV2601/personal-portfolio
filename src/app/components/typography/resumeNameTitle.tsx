import { TextWrapperProps } from "@/app/types"

export const ResumeNameTitle = (props: TextWrapperProps) => {
    const { textContent } = props;
    return (<div className="pw-typo-resume-name-title">
        {textContent}
    </div>)
}