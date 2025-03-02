import Image from "next/image";
import { ProjectBlockProps } from "../types"
import HoverImage from "./hoverImage";
import { HoverProvider } from "./hoverProvider";
import HoverTrigger from "./hoverTrigger";
import { TechnologiesStack } from "./technologiesStack";
import { MainHeader, Paragraph, SecondaryText } from "./typography"

export const ProjectBlock = (props: ProjectBlockProps) => {
    const { projectData } = props;
    return (
        <>
            <HoverProvider>
                <HoverTrigger>
                    <div className="pw-project-page-project-block">

                        <MainHeader textContent={`${projectData.title}`} />
                        <SecondaryText textContent={`${projectData.start} - ${projectData.end}`} />
                        <SecondaryText textContent={projectData.role} />
                        <div className="pw-pos-margin-top-regular" />
                        <Paragraph textContent={projectData.description} />
                        
                        <a href={projectData.url} className="pw-project-page-project-block-a" target="_blank">
                            Project link 
                            <Image src={'/resources/images/redirect.png'} width={24} height={24} objectFit="contain" alt="redirect"/>
                        </a>
                        <div className="pw-pos-margin-top-large" />
                        <Paragraph textContent={'Languages, Frameworks & Tools'} bold />
                        <div className="pw-pos-margin-top-regular" />
                        <TechnologiesStack techsrcs={projectData.technologies} />
                        <div className="relative">
                            <HoverImage srcs={projectData.projectImages} />
                        </div>
                    </div>
                </HoverTrigger>
            </HoverProvider>

            <div className="pw-pos-margin-top-large" />
        </>
    )
}