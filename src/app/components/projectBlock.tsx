"use client";

import Image from "next/image";
import { useState } from "react";
import { ProjectBlockProps } from "../types"
import { TechnologiesStack } from "./technologiesStack";
import { MainHeader, Paragraph, SecondaryText } from "./typography"

export const ProjectBlock = (props: ProjectBlockProps) => {
    const { projectData } = props;
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const totalImages = projectData.projectImages.length;

    const goPrev = () => {
        setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };

    const goNext = () => {
        setActiveImageIndex((prev) => (prev + 1) % totalImages);
    };

    return (
        <>
            <div className="pw-project-page-hover-trigger">
                <div className="pw-project-page-project-block">
                    <div className="pw-project-page-project-block-content">
                        <div className="pw-project-page-project-block-details">
                            <MainHeader textContent={`${projectData.title}`} />
                            <SecondaryText textContent={`${projectData.start} - ${projectData.end}`} />
                            <SecondaryText textContent={projectData.role} />
                            <div className="pw-pos-margin-top-regular" />
                            <Paragraph textContent={projectData.description} />

                            <a href={projectData.url} className="pw-project-page-project-block-a" target="_blank" rel="noreferrer">
                                Project link
                                <Image src={'/resources/images/icons/redirect.webp'} width={24} height={24} objectFit="contain" alt="redirect" />
                            </a>
                            <div className="pw-pos-margin-top-large" />
                            <Paragraph textContent={'Languages, Frameworks & Tools'} bold />
                            <div className="pw-pos-margin-top-regular" />
                            <TechnologiesStack techsrcs={projectData.technologies} />
                        </div>

                        <div className="pw-project-page-project-carousel">
                            <div className="pw-project-page-project-carousel-image-wrap">
                                <Image
                                    src={`/resources/images/projects/${projectData.projectImages[activeImageIndex]}`}
                                    alt={`${projectData.title} preview ${activeImageIndex + 1}`}
                                    width={640}
                                    height={420}
                                    className="pw-project-page-project-carousel-image"
                                />
                            </div>
                            {
                                totalImages > 1 && (
                                    <div className="pw-project-page-project-carousel-controls">
                                        <button type="button" className="pw-project-page-project-carousel-button" onClick={goPrev}>
                                            Prev
                                        </button>
                                        <span className="pw-project-page-project-carousel-indicator">{activeImageIndex + 1}/{totalImages}</span>
                                        <button type="button" className="pw-project-page-project-carousel-button" onClick={goNext}>
                                            Next
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="pw-pos-margin-top-large" />
        </>
    )
}
