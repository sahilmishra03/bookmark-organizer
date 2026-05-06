"use client"

const VIDEO_SRC = "https://pub-3b2ce5759e8b401ba99b5a001278e200.r2.dev/Final%20Ghostmark.mp4"

const Demo = () => {
  return (
    <section className="mt-16 md:mt-24 flex flex-col items-center gap-4 px-4 md:px-0">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
        See Ghostmark in action
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-center max-w-2xl text-sm md:text-base">
        Save links quickly, keep them organized, and find them again without digging through browser folders.
      </p>

      <div className="w-full mt-6 rounded-2xl overflow-hidden border border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b lg:border-b-0 lg:border-r border-dashed border-neutral-200 dark:border-neutral-800 p-6 md:p-8 flex flex-col justify-center gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
                Product Demo
              </p>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                One place for every bookmark you want to keep.
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-lg text-sm md:text-base">
                The demo walks through the core experience: saving a link, organizing it into collections, and finding it later from any device.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                  Organize
                </p>
                <p className="mt-2 font-semibold text-sm md:text-base">
                  Sort links into clean collections
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                  Search
                </p>
                <p className="mt-2 font-semibold text-sm md:text-base">
                  Find saved pages in seconds
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 md:p-4 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
            {/* Removed aspect-[16/10] so the container sizes to the video naturally */}
            <div className="relative w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-black flex">
              <video
                src={VIDEO_SRC}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                // Changed from h-full w-full object-cover to w-full h-auto
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Demo