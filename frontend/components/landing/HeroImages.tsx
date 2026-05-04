"use client"
import { motion } from "framer-motion";


const HeroImages = () => {
    return (
        <div className="absolute inset-0 top-18 pointer-events-none -z-10">
            <motion.div
                className="absolute top-[14rem] left-1/2 w-[85vw] ml-[-42.5vw] md:left-10 md:ml-0 md:w-full h-[90%] scale-90 md:scale-100 origin-top-center md:origin-top-left"
                initial={{ y: -150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: [0.11, 0, 0.5, 0], duration: 0.4, delay: 0.2 }}
            >
                <img
                    src="/dashboard.png"
                    alt="hero-image"
                    className="opacity-100 rounded shadow-2xl md:w-full h-full"
                    style={{ transform: 'rotateX(45deg) rotateZ(-15deg)' }}
                />
            </motion.div>

            <motion.div
                className="absolute top-[18rem] left-1/2 w-[85vw] ml-[-42.5vw] md:left-0 md:ml-0 md:w-full h-[80%] md:h-[90%] -z-10 scale-90 md:scale-100 origin-top-center md:origin-top-left"
                initial={{ y: -150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: [0.11, 0, 0.5, 0], duration: 0.4 }}
            >
                <img
                    src="/dashboard-copy.png"
                    alt="hero-image"
                    className="rounded shadow-2xl w-full h-full opacity-80"
                    style={{ transform: 'rotateX(45deg) rotateZ(-15deg)' }}
                />
            </motion.div>
        </div>
    )
}

export default HeroImages
