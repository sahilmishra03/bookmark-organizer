import Link from "next/link"
import HeroImages from "./HeroImages"


const Hero = () => {
    return (
        <div className="mt-20 md:mt-32 flex flex-col gap-6 relative perspective-[3000px] min-h-[600px] md:min-h-[900px] max-w-screen px-4 md:px-0">
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl tracking-tight leading-[1.1]">
                Save anything.<br />
                Find it everywhere.
            </h1>
            <p className="text-neutral-400 max-w-lg text-base md:text-lg tracking-wide">Your bookmarks, synced across every device the moment you save them. No more lost links, no more digging through browser folders.</p>
            <div className="flex flex-wrap gap-4 items-center">
                <Link href={"#"} className="bg-neutral-900 px-3 py-2  text-white dark:bg-neutral-200  hover:bg-neutral-700 dark:text-black dark:hover:bg-neutral-300 transition-all ease-in duration-150 rounded text-shadow-2xs drop-shadow-2xl drop-shadow-neutral-500 dark:drop-shadow-neutral-700" >Get started free</Link>
                <Link href={"#"} className="hover:bg-neutral-200 dark:hover:bg-neutral-800 px-3 py-2 transition-all ease-in duration-150  rounded">See how it works</Link>
            </div>

            <HeroImages />
        </div>
    )
}

export default Hero
