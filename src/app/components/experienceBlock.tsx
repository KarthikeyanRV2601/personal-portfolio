import Image from "next/image";
import { ExperienceBlockProps } from "../types"
import { MainHeader, Paragraph, SecondaryText } from "./typography"

const getCompanyLogo = (organization: string) => {
    if (organization.toLowerCase().includes("oracle")) return "/resources/images/company-logos/oracle.svg";
    return "/resources/images/company-logos/appscms.svg";
}

const isOracle = (organization: string) => organization.toLowerCase().includes("oracle");

export const ExperienceBlock = (props: ExperienceBlockProps) => {
    const { experienceData } = props;
    return (
        <>
            <div className="pw-experience-page-experience-block">
                <div className="pw-experience-page-experience-block-header">
                    <div className={`pw-experience-page-experience-logo-wrap ${isOracle(experienceData.organization) ? "pw-experience-page-experience-logo-wrap-wide" : ""}`}>
                        <Image
                            src={getCompanyLogo(experienceData.organization)}
                            alt={experienceData.organization}
                            width={56}
                            height={56}
                            className="pw-experience-page-experience-logo"
                        />
                    </div>
                    <div>
                        <MainHeader textContent={`${experienceData.position}, ${experienceData.organization}`} />
                        <SecondaryText textContent={`${experienceData.start} - ${experienceData.end}`} />
                        <SecondaryText textContent={experienceData.location} />
                    </div>
                </div>
                <div className="pw-pos-margin-top-regular" />
                <Paragraph textContent={experienceData.description} />
            </div>

            <div className="pw-pos-margin-top-large" />
        </>
    )
}
