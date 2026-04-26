import Link from "next/link"

const LINKS = [
  {
    heading: "Product",
    items: [
      { label: "Features", href: "#features" },
      { label: "Browser Extension", href: "#" },
      { label: "Mobile App", href: "/mobile-app" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Socials",
    items: [
      { label: "GitHub", href: "#" },
      { label: "Discord", href: "#" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "Sign Up", href: "/login" },
      { label: "Log In", href: "/login" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-neutral-100 dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-0">
        <div className="border-t border-neutral-300 dark:border-neutral-800 mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                <img src="bookmark.png" alt="logo" width={30} height={30} />
              </div>
              <span className="font-semibold text-neutral-900 dark:text-white">Boomark-organizer</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              © {new Date().getFullYear()} Boomarki.<br />All rights reserved.
            </p>
          </div>

          {LINKS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">{col.heading}</span>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-150">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 select-none pointer-events-none">
          <p className="text-[clamp(4rem,15vw,14rem)] font-bold leading-none tracking-tighter text-neutral-300 dark:text-neutral-900 whitespace-nowrap">
            Bookmark
          </p>
        </div>
      </div>
    </footer>
  )
}
