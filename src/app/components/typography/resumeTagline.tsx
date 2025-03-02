import { TextWrapperProps } from "@/app/types"

export const ResumeTagLine = (props: TextWrapperProps) => {
    const { textContent } = props;
    return (<div className="pw-typo-resume-tagline">
        {textContent}
    </div>)
}