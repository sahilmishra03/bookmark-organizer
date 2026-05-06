import { Bell, FolderKanban, Sparkles, Users } from "lucide-react"

const roadmapItems = [
  {
    title: "Browser Extension",
    description:
      "Save bookmarks instantly from any website with one click and sync automatically with your account.",
    status: "Next up",
    accent: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950",
    icon: Sparkles,
  },
  {
    title: "Mobile App",
    description:
      "Access and manage your bookmarks on Android and iOS with real-time sync across devices.",
    status: "Planned",
    accent: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
    icon: Users,
  },
  {
    title: "Advanced Search",
    description:
      "Quickly find bookmarks using filters like tags, folders, and favorites for faster access.",
    status: "Planned",
    accent: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
    icon: FolderKanban,
  },
]

const releaseNotes = [
  "Import and export bookmarks with HTML support",
  "Tag system for better organization",
  "Improved performance and smoother experience",
]

export default function Upcoming() {
  return (
    <section className="mt-16 md:mt-24 flex flex-col items-center gap-4 px-4 md:px-0">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
        Upcoming
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-center max-w-2xl text-sm md:text-base">
        A quick look at the next improvements planned for Ghostmark.
      </p>

      <div className="mt-6 w-full overflow-hidden rounded-2xl border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="border-b border-dashed border-neutral-200 p-6 md:p-8 lg:border-b-0 lg:border-r dark:border-neutral-800">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
              Roadmap
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              What's coming next for Ghostmark.
            </h3>
            <p className="mt-4 max-w-xl text-sm text-neutral-500 dark:text-neutral-400 md:text-base">
              The core product is already focused on fast saving, clean organization,
              and search. These are the next improvements planned to make the library
              feel even sharper.
            </p>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                  <Bell className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Current roadmap focus</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Better organization, collaboration, and smarter saves.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {releaseNotes.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 lg:p-8 bg-neutral-50/70 dark:bg-neutral-950">
            <div className="grid gap-4">
              {roadmapItems.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
                          <Icon className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                        </div>
                        <span
                          className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${item.accent}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                        <p className="mt-2 max-w-lg text-sm text-neutral-500 dark:text-neutral-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
