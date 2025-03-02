import { MainHeader } from "../components/typography/mainHeader"
import { Paragraph } from "../components/typography/paragraph"
import aboutMeData from '../data/aboutMe.json';
import { motion } from "framer-motion";

export const AboutMePage = () => {
    const { name, title, tagline, description, mainLandingTitle } = aboutMeData.data
    return (
        <motion.div
            initial={{ opacity: 0, x: "2%" }} // Start off-screen (right side)
            animate={{ opacity: 1, x: 0 }} // Move into view
            exit={{ x: "-100%" }} // Exit off-screen (left side)
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="p-6 bg-gray-800 text-white rounded-lg shadow-md"
        >
            <div className="pw-about-me-page">
                <div className="pw-pos-margin-top-large" />
                <div className="pw-pos-margin-top-large" />
                <div className="pw-about-me-page-landing-wrap">
                    <div className="pw-about-me-page-landing-wrap-left-section">
                        <MainHeader textContent={mainLandingTitle} />
                    </div>
                    <div className="pw-about-me-page-landing-wrap-right-section">
                        <div>
                            <MainHeader textContent={name} />
                            <MainHeader textContent={title} />
                            <Paragraph textContent={tagline} bold />
                        </div>
                        <Paragraph textContent={description} />
                    </div>
                </div>
            </div>
        </motion.div>

    )
}