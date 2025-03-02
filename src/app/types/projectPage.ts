export interface ProjectData {
    title: string;
    role: string;
    start: string;
    end: string;
    description: string;
    technologies: string[];
    projectImages: string[];
    url: string;
}

export interface ProjectBlockProps {
    projectData: ProjectData;
}