"use client"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowBigLeft, ArrowBigRight, BookmarkIcon, Home, Settings, Folder, Star, Sun, Moon, Search, Bookmark } from "lucide-react"
import { useTheme } from "@/components/layout/ThemeProvider"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"

const navItems = [
  { icon: Home,         label: "Dashboard",  href: "/home" },
  { icon: BookmarkIcon, label: "Bookmarks",  href: "/home/bookmarks" },
  { icon: Folder,   label: "Folders",    href: "/home/folders" },
  { icon: Star,     label: "Favorites",  href: "/home/favorites" },
  { icon: Search,   label: "Search",     href: "/home/search" },
  { icon: Settings, label: "Settings",   href: "/home/settings" },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  isMobile?: boolean
}

const Sidebar = ({ isOpen, setIsOpen, isMobile = false }: SidebarProps) => {
  const [hovering, setIsHovering] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    setMounted(true)
    // Debug: Log user profile picture
    console.log('Sidebar user profile picture:', user?.profile_picture)
  }, [user?.profile_picture])
  useEffect(() => {
    // Force re-render when theme changes
  }, [theme])

  return (
    <>
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />
        )}
      </AnimatePresence>

      <div
        className="fixed left-0 top-0 h-screen z-50"
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
      >
        <AnimatePresence>
          {hovering && !isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(!isOpen)}
              className="h-6 w-6 flex justify-center items-center absolute z-[100] -right-3 top-4 bg-neutral-200 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 rounded-md text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer"
            >
              {isOpen ? <ArrowBigLeft size={16} /> : <ArrowBigRight size={16} />}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={isMobile ? { x: "-100%" } : { width: "220px" }}
          animate={
            isMobile
              ? { x: isOpen ? "0%" : "-100%" }
              : { width: isOpen ? "220px" : "50px" }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={isMobile ? { width: "220px" } : undefined}
          className="h-full bg-white dark:bg-neutral-950 border-r border-dashed border-neutral-200 dark:border-neutral-700 overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 px-[14px] py-4 border-b border-dashed border-neutral-200 dark:border-neutral-700">
              <img
                src={mounted ? (theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg") : "/favicon-light.svg"}
                alt="logo"
                width={30}
                height={30}
              />
              <AnimatePresence>
                {(isOpen || isMobile) && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-neutral-900  dark:text-neutral-100 font-semibold text-sm whitespace-nowrap"
                  >
                    Ghostmark
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <nav className="flex flex-col gap-1 px-2 py-4">
              {navItems.map(({ icon: Icon, label, href }) => {
                const active = href === "/home" ? pathname === "/home" : pathname.startsWith(href.split("?")[0])
                return (
                  <div
                    key={label}
                    onClick={() => { router.push(href); if (isMobile) setIsOpen(false) }}
                    className={`flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors
                      ${active
                        ? "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900"
                        : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                      }`}
                  >
                    <Icon size={18} className="shrink-0" />
                    <AnimatePresence>
                      {(isOpen || isMobile) && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="whitespace-nowrap text-sm font-medium"
                        >
                          {label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </nav>
          </div>

          <div>
            <div
              onClick={() => { router.push('/home/profile'); if (isMobile) setIsOpen(false) }}
              className="flex items-center gap-3 px-[14px] py-3 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 border-t border-dashed border-neutral-200 dark:border-neutral-700"
            >
              {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt={user.name || 'Profile'}
                  className="h-7 w-7 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    console.error('Failed to load profile picture in sidebar:', user.profile_picture)
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      const fallback = parent.querySelector('.fallback-avatar') as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }
                  }}
                />
              ) : null}
              <div className={`h-7 w-7 rounded-full bg-neutral-800 dark:bg-neutral-200 flex items-center justify-center shrink-0 fallback-avatar ${user?.profile_picture ? 'hidden' : ''}`}>
                <span className="text-xs font-semibold text-white dark:text-neutral-900">
                  {user?.name ? user.name[0].toUpperCase() : '?'}
                </span>
              </div>
              <AnimatePresence>
                {(isOpen || isMobile) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col min-w-0"
                  >
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate whitespace-nowrap">
                      {user?.name || 'Profile'}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate whitespace-nowrap">
                      {user?.email || 'View profile'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full flex cursor-pointer items-center gap-2 px-[14px] p-4 text-neutral-600 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              {mounted ? (theme === "dark" ? <Sun size={16} className="shrink-0" /> : <Moon size={16} className="shrink-0" />) : <Moon size={16} className="shrink-0" />}
              <AnimatePresence>
                {(isOpen || isMobile) && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap"
                  >
                    {mounted ? (theme === "dark" ? "Light mode" : "Dark mode") : "Dark mode"}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Sidebar
