import Image from "next/image";
import { ResumeSectionProps } from "../types";
import { ResumeNameTitle, ResumeTagLine } from "./typography";

export const ResumeTitleSection = (props: ResumeSectionProps) => {
    return (<>
        <div className="pw-resume-page-title-section pw-pos-margin-top-large">
            <div>
                <ResumeNameTitle textContent={props.resumeData.resumeNameTitle} />
                <ResumeTagLine textContent={props.resumeData.resumeTagLine} />
            </div>
            <a href={'/KarthikeyanRV_Resume.pdf'} download="Karthikeyan_RV_Resume.pdf" className="pw-resume-page-title-section-download-button pw-interactible">
                <Image src={'/resources/images/download.png'} width={20} height={20} alt="download" />
            </a>
        </div>
    </>);
}