import { Experience, Position, ResumeSectionProps } from "../types";
import { Paragraph, SecondaryText, SubHeader, SubHeaderSmall } from "./typography";

export const ResumeExperienceSection = (props: ResumeSectionProps) => {

    const renderPositionInformation = (position: Position) => {
        return (
            <div className="pw-resume-page-experience-section-experience-position-information pw-pos-margin-left-large pw-pos-margin-top-small">
                {position.projects && <>
                    <Paragraph textContent="Projects" bold />
                    {
                        position.projects.map((project, index) => <div key={index}>
                            <Paragraph textContent={`${index + 1}. ${project}`} />
                        </div>)
                    }
                </>

                }
                <div className="pw-pos-margin-top-regular"/>
                {position.responsibilities && <>
                    <Paragraph textContent="Key Responsibilities & Achievements" bold />
                    <div className="pw-pos-margin-top-regular"/>
                    {
                        position.responsibilities.map((responsibility, index) => <div key={index}>

                            <Paragraph textContent={responsibility.subtitle} bold />
                            {responsibility.items.map((item, index) => <div key={index}><Paragraph textContent={`${index + 1}. ${item}`} /></div>)}
                        </div>)
                    }
                </>}
            </div>
        )
    }

    const renderPosition = (position: Position) => {
        return (<div className="pw-resume-page-experience-section-experience-position pw-pos-margin-top-regular">
            {
                <>
                    <Paragraph textContent={position.position} bold />
                    <Paragraph textContent={position.location} />
                    <SecondaryText textContent={`${position.start} - ${position.end}`} />
                    <div className="pw-pos-margin-top-regular"/>
                    {renderPositionInformation(position)}
                </>
            }
        </div>)
    }

    const renderExperience = (experience: Experience) => {
        return (<div className="pw-resume-page-experience-section-experience">
            {
                <>
                    <SubHeaderSmall textContent={experience.organization} />
                    {experience.positions.map((position, index) => <div key={index}>{renderPosition(position)}</div>)}
                </>
            }
        </div>)
    }

    return (<div className="pw-resume-page-experience-section pw-pos-margin-top-large">
        <SubHeader textContent="EXPERIENCE" />
        {props.resumeData.experience.map((experience, index) => <div key={index} className="pw-pos-margin-top-regular">{renderExperience(experience)}</div>)}

    </div>);
}