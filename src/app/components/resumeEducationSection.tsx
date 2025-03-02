import { ResumeSectionProps } from "../types";
import { Paragraph, SecondaryText, SubHeader, SubHeaderSmall } from "./typography";

export const ResumeEducationSection = (props: ResumeSectionProps) => {


    return (<div className="pw-resume-page-education-section pw-pos-margin-top-large">
        <SubHeader textContent="EDUCATION" />
        {
            props.resumeData.education.map((education, index) => <div key={index}>{
                <>
                    <SubHeaderSmall textContent={education.university} />
                    <Paragraph textContent={education.university} />
                    <SecondaryText textContent={`${education.start} - ${education.end}`} />
                    <Paragraph textContent={education.score} bold />
                    <div className="pw-pos-margin-left-large pw-pos-margin-top-regular">
                        <Paragraph textContent="Achievements" bold />
                        {
                            education.achievements.map((achievement, index) => <div key={index}>
                                <Paragraph textContent={`${index + 1}. ${achievement}`} />
                            </div>)
                        }

                    </div>
                </>
            }
            </div>)
        }
    </div>);
}