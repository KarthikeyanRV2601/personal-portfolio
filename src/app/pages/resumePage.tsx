import { motion } from "framer-motion";
import { ResumeEducationSection, ResumeExperienceSection, ResumeSkillsSection, ResumeTitleSection } from "../components";
import { ResumeProjectsSection } from "../components/resumeProjectsSection";
import resumeDataRaw from '../data/resume.json';

export const ResumePage = () => {
    const resumeData = resumeDataRaw.data;
    return (

        <motion.div
                       initial={{opacity: 0,  x: "2%" }} // Start off-screen (right side)
            animate={{opacity: 1, x: 0 }} // Move into view
            exit={{ x: "-100%" }} // Exit off-screen (left side)
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="p-6 bg-gray-800 text-white rounded-lg shadow-md"
        >
            <div className="pw-resume-page">
                <ResumeTitleSection resumeData={resumeData} />
                <ResumeSkillsSection resumeData={resumeData} />
                <ResumeExperienceSection resumeData={resumeData} />
                <ResumeEducationSection resumeData={resumeData} />
                <ResumeProjectsSection resumeData={resumeData} />
            </div>
        </motion.div>
    );
}