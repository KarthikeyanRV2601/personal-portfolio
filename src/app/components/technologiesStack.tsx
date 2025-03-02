import { useCallback } from "react";
import { TechnologiesStackProps } from "../types";
import Image from "next/image";

export const TechnologiesStack = (props: TechnologiesStackProps) => {
    const { techsrcs } = props;
    const techImage = useCallback((imageName: string) => {
        return (
            <Image className="pw-project-page-tech-stack-image" src={`/resources/images/${imageName}.png`} alt={imageName} height={40} width={40} title={imageName}/>
        )
    }, []);
    return (<div className="pw-project-page-tech-stack">
        {
            techsrcs.map((techsrc, index) =>
                <div key={index} title={techsrc}>{
                    techImage(techsrc)}
                </div>
            )
        }
    </div>)
}