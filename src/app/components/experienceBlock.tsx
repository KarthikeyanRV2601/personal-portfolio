import { ExperienceBlockProps } from "../types"
import { MainHeader, Paragraph, SecondaryText } from "./typography"

export const ExperienceBlock = (props: ExperienceBlockProps) => {
    const { experienceData } = props;
    return (
        <>
            <div className="pw-experience-page-experience-block">
                <MainHeader textContent={`${experienceData.position}, ${experienceData.organization}`} />
                <SecondaryText textContent={`${experienceData.start} - ${experienceData.end}`} />
                <SecondaryText textContent={experienceData.location} />
                <div className="pw-pos-margin-top-regular" />
                <Paragraph textContent={experienceData.description} />
            </div>

            <div className="pw-pos-margin-top-large" />
        </>
    )
}