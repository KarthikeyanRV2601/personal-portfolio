export interface ResumeSectionProps {
    resumeData: ResumeData;
}

export type ResumeData = {
    resumeNameTitle: string;
    resumeTagLine: string;
    skills: {
        languages: string;
        frameworkAndTools: string;
        aiMlAndDataScience: string;
        certifications: string;
    };
    experience: Experience[];
    education: Education[];
    projects: Project[];
};

export type Experience = {
    organization: string;
    positions: Position[];
};

export type Position = {
    position: string;
    location: string;
    start: string;
    end: string;
    projects?: string[];
    responsibilities?: Responsibility[];
};

export type Responsibility = {
    subtitle: string;
    items: string[];
};

export type Education = {
    university: string;
    course: string;
    start: string;
    end: string;
    score: string;
    achievements: string[];
};

export type Project = {
    projectTitle: string;
    description: string;
    link: string;
};
