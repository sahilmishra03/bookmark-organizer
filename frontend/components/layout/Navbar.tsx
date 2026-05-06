"use client"

import { useState } from "react"
import { useTheme } from "@/components/layout/ThemeProvider"
import { Sun, Moon, Home, Sparkles, Info } from "lucide-react"
import {
    Navbar, NavBody, NavItems, NavbarLogo, NavbarButton,
    MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle,
} from "@/components/ui/resizable-navbar"

const navItems = [
    { name: "Home", link: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Features", link: "#features", icon: <Sparkles className="w-4 h-4" /> },
    { name: "About", link: "/about", icon: <Info className="w-4 h-4" /> },
]

export default function AppNavbar() {
    const [open, setOpen] = useState(false)
    const { theme, setTheme } = useTheme()

    return (
        <Navbar className="top-0">
            <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        aria-label="Toggle theme"
                    >
                        <Sun size={18} className="hidden dark:block" />
                        <Moon size={18} className="block dark:hidden" />
                    </button>
                    <NavbarButton variant="dark" href="/login">Start for free</NavbarButton>
                </div>
            </NavBody>

            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
                </MobileNavHeader>
                <MobileNavMenu isOpen={open} onClose={() => setOpen(false)}>
                    {navItems.map((item) => (
                        <a key={item.name} href={item.link} onClick={() => setOpen(false)}
                            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300 text-sm font-medium">
                            {item.icon}
                            {item.name}
                        </a>
                    ))}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300 text-sm font-medium"
                    >
                        <Sun size={16} className="hidden dark:block" />
                        <Moon size={16} className="block dark:hidden" />
                        <span className="hidden dark:inline">Light mode</span>
                        <span className="inline dark:hidden">Dark mode</span>
                    </button>
                    <NavbarButton variant="dark" href="/login" className="w-full">Start for free</NavbarButton>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    )
}
