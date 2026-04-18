"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import {
    Navbar, NavBody, NavItems, NavbarLogo, NavbarButton,
    MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle,
} from "@/components/ui/resizable-navbar"

const navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "About", link: "#about" },
]

export default function AppNavbar() {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => setMounted(true), [])

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
                        {mounted ? (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />) : <Moon size={18} />}
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
                            className="text-neutral-600 dark:text-neutral-300 text-sm font-medium">
                            {item.name}
                        </a>
                    ))}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300 text-sm font-medium"
                    >
                        {mounted ? (theme === "dark" ? <Sun size={16} /> : <Moon size={16} />) : <Moon size={16} />}
                        {mounted ? (theme === "dark" ? "Light mode" : "Dark mode") : "Dark mode"}
                    </button>
                    <NavbarButton variant="dark" href="/login" className="w-full">Start for free</NavbarButton>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    )
}
