import Link from "next/link"
import HeroImages from "./HeroImages"
import ImagesBadgeDemoTwo from "../images-badge-demo-2"

const Hero = () => {
    return (
        <div className="mt-20 md:mt-32 flex flex-col gap-6 relative perspective-[3000px] min-h-[500px] sm:min-h-[600px] md:min-h-[900px] w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold max-w-4xl tracking-tight leading-[1.1] z-10">
                Save anything.<br />
                Find it everywhere.
            </h1>
            <p className="text-neutral-400 max-w-lg text-base md:text-lg tracking-wide z-10">
                Your bookmarks, synced across every device the moment you save them. No more lost links, no more digging through browser folders.
            </p>
            <div className="flex flex-wrap gap-4 items-center z-10">
                <Link href={"/login"} className="bg-neutral-900 px-4 py-2 text-white dark:bg-neutral-200 hover:bg-neutral-700 dark:text-black dark:hover:bg-neutral-300 transition-all ease-in duration-150 rounded text-shadow-2xs drop-shadow-2xl drop-shadow-neutral-500 dark:drop-shadow-neutral-700 text-sm md:text-base">
                    Get started free
                </Link>
                <Link href={"#features"} className="hover:bg-neutral-200 dark:hover:bg-neutral-800 px-4 py-2 transition-all ease-in duration-150 rounded text-sm md:text-base">
                    See how it works
                </Link>
            </div>
            <div className="z-10 mt-4 md:mt-0">
                <ImagesBadgeDemoTwo/>
            </div>

            <HeroImages />
        </div>
    )
}

export default Hero