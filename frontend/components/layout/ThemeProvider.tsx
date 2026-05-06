"use client"

import { createContext, useContext, useEffect, useState, useMemo } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Read theme synchronously from localStorage to avoid a flash.
// The blocking script in layout.tsx already applied the class before paint,
// this just keeps React state in sync.
function getInitialTheme(storageKey: string, fallback: Theme): Theme {
  if (typeof window === "undefined") return fallback
  try {
    const stored = localStorage.getItem(storageKey) as Theme
    if (stored === "dark" || stored === "light" || stored === "system") return stored
  } catch {}
  return fallback
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme(storageKey, defaultTheme))

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    let resolvedTheme: string
    if (theme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
    } else {
      resolvedTheme = theme
    }

    root.classList.add(resolvedTheme)
    root.style.colorScheme = resolvedTheme

    // Sync favicon with theme
    const faviconUrl = resolvedTheme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg"
    document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]')
      .forEach((el) => { (el as HTMLLinkElement).href = faviconUrl })
  }, [theme])

  const value = useMemo(() => ({
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }), [theme, storageKey])

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
