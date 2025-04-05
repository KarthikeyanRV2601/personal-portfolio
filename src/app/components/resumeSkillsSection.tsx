import { ResumeSectionProps } from "../types";
import { Paragraph, SecondaryText, SubHeader } from "./typography";

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

        <div className="pw-resume-page-skills-section-skill">
            <Paragraph textContent={'AI/ML & Data Science'} bold />
            <Paragraph textContent={props.resumeData.skills.aiMlAndDataScience} />
        </div>

        <div className="pw-resume-page-skills-section-skill">
            <Paragraph textContent={'Certifications'} bold />
            <Paragraph textContent={props.resumeData.skills.certifications} />
        </div>
        <SecondaryText textContent="*(n) indicates skill level on a scale from 1 (lowest) to 10 (highest)." />
    </div>);
}