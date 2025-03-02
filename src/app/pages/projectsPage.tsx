import { motion } from "framer-motion";
import { ProjectBlock } from "../components"
import projectData from '../data/project.json';

export const ProjectsPage = () => {
    return (

        <motion.div
                       initial={{opacity: 0,  x: "2%" }} // Start off-screen (right side)
            animate={{opacity: 1, x: 0 }} // Move into view
            exit={{ x: "-100%" }} // Exit off-screen (left side)
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="p-6 bg-gray-800 text-white rounded-lg shadow-md"
        >
            {projectData.data.map((project, index) => <ProjectBlock projectData={project} key={index} />)}
        </motion.div>
    )
}