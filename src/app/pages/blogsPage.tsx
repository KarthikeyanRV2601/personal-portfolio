"use client"
import { useCallback, useState } from "react"
import { BlogIndex } from "../components/blogIndex"
import { BlogContent } from "../components/blogContet"
import blogsDataRaw from '../data/blogs.json';
import { motion } from "framer-motion";

export const BlogsPage = () => {
    const { data: blogsData } = blogsDataRaw;
    const [showIndex, setShowIndex] = useState<boolean>(true)
    const [currentBlogIndex, setCurrentBlogIndex] = useState<number>(-1);

    const handleNavigationButtonClick = useCallback((left: boolean) => {
        if (left) {
            if (currentBlogIndex > 0) setCurrentBlogIndex(currentBlogIndex - 1);
        } else {
            if (currentBlogIndex < blogsData.length - 1) setCurrentBlogIndex(currentBlogIndex + 1)
        }
    }, [currentBlogIndex, blogsData])

    const returnToIndex = useCallback(() => {
        setCurrentBlogIndex(0);
        setShowIndex(true);
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, x: "2%" }} // Start off-screen (right side)
            animate={{ opacity: 1, x: 0 }} // Move into view
            exit={{ x: "-100%" }} // Exit off-screen (left side)
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="p-6 bg-gray-800 text-white rounded-lg shadow-md"
        >
            <div className="pw-blogs-page">
                {
                    showIndex ? <BlogIndex blogsData={blogsData} setCurrentBlogIndex={setCurrentBlogIndex} setShowIndex={setShowIndex} /> : <BlogContent handleNavigationButtonClick={handleNavigationButtonClick} blogData={blogsData[currentBlogIndex]} setShowIndex={setShowIndex} leftButtonDisabled={currentBlogIndex === 0} rightButtonDisabled={currentBlogIndex === blogsData.length - 1} returnToIndex={returnToIndex} />
                }
            </div>
        </motion.div>

    )
}