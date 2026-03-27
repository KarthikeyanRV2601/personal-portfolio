import { MainHeader } from "../components/typography/mainHeader"
import { Paragraph } from "../components/typography/paragraph"
import aboutMeData from '../data/aboutMe.json';
import { motion } from "framer-motion";
import Image from "next/image";

export const AboutMePage = () => {
    const { name, title, tagline, description, mainLandingTitle, linkedInLink } = aboutMeData.data
    const githubLink = "https://github.com/KarthikeyanRV2601";
    return (
        <motion.div
            initial={{ opacity: 0, x: "2%" }} // Start off-screen (right side)
            animate={{ opacity: 1, x: 0 }} // Move into view
            exit={{ x: "-100%" }} // Exit off-screen (left side)
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="pw-content-shell pw-content-shell-full"
        >
            <div className="pw-about-me-page">
                <div className="pw-about-me-page-landing-wrap">
                    <div className="pw-about-me-page-landing-wrap-left-section">
                        <MainHeader textContent={mainLandingTitle} />
                    </div>
                    <div className="pw-about-me-page-landing-wrap-right-section">
                        <div className="pw-about-me-page-cover-image-wrap">
                            <Image src="/resources/images/profile/cover-photo.png" alt={name} fill sizes="(max-width: 980px) 100vw, 38vw" className="pw-about-me-page-cover-image" />
                        </div>
                        <div>
                            <MainHeader textContent={name} link={linkedInLink}/>
                            <br/>
                            <MainHeader textContent={title} />
                            <Paragraph textContent={tagline} bold />
                            <div className="pw-about-me-page-social-links">
                                <a href={linkedInLink} target="_blank" rel="noreferrer" className="pw-about-me-page-social-link" aria-label="LinkedIn">
                                    <span>in</span>
                                </a>
                                <a href={githubLink} target="_blank" rel="noreferrer" className="pw-about-me-page-social-link" aria-label="GitHub">
                                    <span>gh</span>
                                </a>
                            </div>
                        </div>
                        <Paragraph textContent={description} />
                    </div>
                </div>
            </div>
        </motion.div>

    )
}
