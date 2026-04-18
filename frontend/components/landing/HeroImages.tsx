"use client"
import { motion } from "framer-motion";
import Image from "next/image";


const HeroImages = () => {
    return (
        <div className="absolute inset-0 top-18 pointer-events-none -z-10">
            <motion.div
                className="absolute top-42 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 w-[85%] md:w-full h-[90%] scale-90 md:scale-100 origin-top-center md:origin-top-left"
                initial={{ y: -150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: [0.11, 0, 0.5, 0], duration: 0.4, delay: 0.2 }}
            >
                <Image
                    src={"https://assets.aceternity.com/agenforce-demo-1.jpg"}
                    height={1000}
                    width={1000}
                    alt="hero-image"
                    className="opacity-full rotate-x-45 rotate-z-[-15deg] rounded shadow-2xl w-full h-full opacity-120 mask-r-from-200 mask-b-from-160"
                />
            </motion.div>

            <motion.div
                className="absolute top-62 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-[85%] md:w-full h-[90%] -z-5 scale-90 md:scale-100 origin-top-center md:origin-top-left"
                initial={{ y: -150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: [0.11, 0, 0.5, 0], duration: 0.4 }}
            >
                <Image
                    src={"https://assets.aceternity.com/agenforce-demo-2.jpg"}
                    height={1000}
                    width={1000}
                    alt="hero-image"
                    className="rotate-x-45 rotate-z-[-15deg] rounded shadow-2xl w-full h-full mask-r-from-200 mask-b-from-100 opacity-80"
                />
            </motion.div>
        </div>
    )
}

export default HeroImages
