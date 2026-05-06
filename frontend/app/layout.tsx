import type { Metadata } from "next";
import { Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Analytics } from '@vercel/analytics/next';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghostmark",
  description: "Save anything. Find it everywhere.",
};

// Inline blocking script that runs before any paint to prevent theme flash.
// Reads the stored theme from localStorage and applies it synchronously.
const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('ui-theme');
    var theme = (stored === 'dark' || stored === 'light') ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var d = document.documentElement;
    d.classList.remove('light','dark');
    d.classList.add(theme);
    d.style.colorScheme = theme;
    // Apply favicon based on theme
    var url = theme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
    document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]')
      .forEach(function(el){ el.href = url; });
  } catch(e){}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", geistMono.variable, "font-sans", geist.variable)} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon-light.svg" />
        <link rel="shortcut icon" href="/favicon-light.svg" />
        <link rel="apple-touch-icon" href="/favicon-light.svg" />
        {/* Blocking inline script — runs before paint to set theme class */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
