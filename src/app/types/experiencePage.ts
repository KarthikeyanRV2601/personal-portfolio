export interface ExperienceData {
    position: string;
    organization: string;
    location: string;
    start: string;
    end: string;
    description: string;
}

export interface ExperienceBlockProps {
    experienceData: ExperienceData;
}