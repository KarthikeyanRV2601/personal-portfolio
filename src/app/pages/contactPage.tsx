import { motion } from "framer-motion"
import { ContactForm, MainHeader } from "../components"

export const ContactPage = () => {

    return (
        <motion.div
                       initial={{opacity: 0,  x: "2%" }} // Start off-screen (right side)
            animate={{opacity: 1, x: 0 }} // Move into view
            exit={{ x: "-100%" }} // Exit off-screen (left side)
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="pw-content-shell"
        >
            <div className="pw-contact-page">
                <MainHeader textContent="Let's connect" />
                <div className="pw-pos-margin-top-large" />
                <ContactForm />
            </div>
        </motion.div>

    )
}