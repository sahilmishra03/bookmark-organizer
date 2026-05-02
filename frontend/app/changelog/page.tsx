import Link from 'next/link'

export default function Changelog() {
  const updates = [
    {
      version: "v1.0.0",
      date: "May 2026",
      title: "Ghostmark Launch",
      changes: [
        "Initial release of Ghostmark bookmark manager.",
        "Create folders and save bookmarks easily.",
        "Basic search and favorites support added."
      ]
    },
    {
      version: "v1.1.0",
      date: "June 2026",
      title: "Tags & Import / Export",
      changes: [
        "Added tag system for better organization.",
        "Import bookmarks from browser HTML files.",
        "Export bookmarks in Chrome-compatible format."
      ]
    },
    {
      version: "v1.2.0",
      date: "July 2026",
      title: "Performance & Improvements",
      changes: [
        "Improved search speed and accuracy.",
        "Better UI and smoother experience.",
        "Bug fixes and stability improvements."
      ]
    },
    {
      version: "v1.3.0 (Upcoming)",
      date: "August 2026",
      title: "Browser Extension",
      changes: [
        "Chrome extension for one-click bookmark saving.",
        "Instant sync with your account.",
        "Save links directly from any website."
      ]
    },
    {
      version: "v1.4.0 (Planned)",
      date: "September 2026",
      title: "Mobile App",
      changes: [
        "Mobile app for Android and iOS.",
        "Access bookmarks anytime, anywhere.",
        "Real-time sync across devices."
      ]
    },
    {
      version: "v1.5.0 (Planned)",
      date: "October 2026",
      title: "Advanced Search",
      changes: [
        "Search using tags, folders, and favorites.",
        "Faster and more accurate results.",
        "Improved filtering experience."
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white py-12 md:py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-8 md:mb-12">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Changelog</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-16">
          Updates and upcoming features of Ghostmark.
        </p>

        {/* Timeline Container */}
        <div className="space-y-12 border-l border-neutral-200 dark:border-neutral-800 ml-3 md:ml-0 md:pl-8">
          {updates.map((update, index) => (
            <div key={index} className="relative pl-8 md:pl-0">
              
              {/* Timeline Dot */}
              <div className="absolute w-3 h-3 bg-black dark:bg-white rounded-full -left-[38px] md:-left-[38px] top-1.5 ring-4 ring-white dark:ring-[#0a0a0a]"></div>
              
              {/* Content */}
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
                <span className="px-2.5 py-1 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 rounded-md w-fit">
                  {update.version}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {update.date}
                </span>
              </div>
              
              <h2 className="text-xl font-bold mb-4">{update.title}</h2>
              
              <ul className="space-y-3 text-neutral-600 dark:text-neutral-300">
                {update.changes.map((change, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-neutral-300 dark:text-neutral-700 mt-1.5">-</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
