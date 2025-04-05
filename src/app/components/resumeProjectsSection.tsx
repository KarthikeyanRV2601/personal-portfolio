import { ResumeSectionProps } from "../types";
import { Paragraph, SubHeader } from "./typography";

export const ResumeProjectsSection = (props: ResumeSectionProps) => {
    return (<div className="pw-resume-page-projects-section  pw-pos-margin-top-large">
        <SubHeader textContent="PROJECTS" />
        {
            props.resumeData.projects.map((project, index) => <div key={index} className="pw-pos-margin-top-regular">
                <Paragraph textContent={project.projectTitle} bold />
                <div className="pw-pos-margin-left-large">
                    <Paragraph textContent={project.description} />
                    <a href={project.link} className="pw-project-page-project-block-a" target="_blank">
                        Click here to view project
                    </a>
                </div>
            </div>)
        }

    </div>);
}