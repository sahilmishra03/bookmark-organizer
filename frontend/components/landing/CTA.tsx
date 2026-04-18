import Link from "next/link"

export default function CTA() {
  return (
    <section className="mt-20 md:mt-40 flex flex-col items-center gap-6 text-center px-4 md:px-0 py-24 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl">
        Start saving smarter.<br />
        Never lose a link again.
      </h2>
      <p className="text-neutral-400 max-w-lg text-base md:text-lg tracking-wide">
        Join thousands of people who use Boomarki to save, organise, and access their bookmarks everywhere.
      </p>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Link href="#" className="bg-neutral-900 px-5 py-2.5 text-white dark:bg-neutral-200 hover:bg-neutral-700 dark:text-black dark:hover:bg-neutral-300 transition-all ease-in duration-150 rounded font-medium">
          Get started free
        </Link>
        <Link href="#pricing" className="hover:bg-neutral-200 dark:hover:bg-neutral-800 px-5 py-2.5 transition-all ease-in duration-150 rounded">
          View pricing
        </Link>
      </div>
    </section>
  )
}
