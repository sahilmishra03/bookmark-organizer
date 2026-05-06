import Link from "next/link"

export default function CTA() {
  return (
    <section className="mt-16 md:mt-24 flex flex-col items-center gap-6 text-center px-6 md:px-12 py-16 md:py-24 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl w-full">
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl">
        Start saving smarter.<br />
        Never lose a link again.
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 max-w-lg text-sm sm:text-base md:text-lg tracking-wide">
        Join thousands of people who use Ghostmark to save, organise, and access their bookmarks everywhere. <strong>Completely free forever.</strong>
      </p>
      <div className="flex flex-wrap gap-4 items-center justify-center mt-4">
        <Link href="/login" className="bg-neutral-900 px-6 py-3 text-white dark:bg-neutral-200 hover:bg-neutral-700 dark:text-black dark:hover:bg-neutral-300 transition-all ease-in duration-150 rounded font-medium text-sm md:text-base">
          Get started free
        </Link>
      </div>
    </section>
  )
}
