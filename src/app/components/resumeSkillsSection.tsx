import { ResumeSectionProps } from "../types";
import { Paragraph, SubHeader } from "./typography";

export const ResumeSkillsSection = (props: ResumeSectionProps) => {
    return (<div className="pw-resume-page-skills-section pw-pos-margin-top-large">
        <SubHeader textContent="SKILLS" />
        <div className="pw-resume-page-skills-section-skill">
            <Paragraph textContent={'Languages'} bold />
            <Paragraph textContent={props.resumeData.skills.languages} />
        </div>

        <div className="pw-resume-page-skills-section-skill">
            <Paragraph textContent={'Framework & Tools'} bold />
            <Paragraph textContent={props.resumeData.skills.frameworkAndTools} />
        </div>

    </div>);
}