import type { Metadata } from "next";
import { Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
    function applyFavicon(isDark) {
      // Add a timestamp or version to bust browser cache
      var url = (isDark ? '/favicon-dark.svg' : '/favicon-light.svg') + '?v=' + new Date().getTime();
      
      var links = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
      if (links.length === 0 || links[0].href.indexOf('.ico') !== -1) {
        // Remove Next.js default .ico if present
        links.forEach(function(el) { el.parentNode.removeChild(el); });

        var icon1 = document.createElement('link'); icon1.rel = 'icon'; icon1.type = 'image/svg+xml'; icon1.href = url;
        var icon2 = document.createElement('link'); icon2.rel = 'shortcut icon'; icon2.type = 'image/svg+xml'; icon2.href = url;
        var icon3 = document.createElement('link'); icon3.rel = 'apple-touch-icon'; icon3.href = url;
        
        document.head.appendChild(icon1);
        document.head.appendChild(icon2);
        document.head.appendChild(icon3);
      } else {
        // Update existing SVG links
        links.forEach(function(el) { el.href = url; });
      }
    }
    
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    applyFavicon(media.matches);
    media.addEventListener('change', function(e) { applyFavicon(e.matches); });
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
        {/* Blocking inline script — runs before paint to set theme class and inject dynamic favicon */}
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
