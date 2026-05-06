"use client";
import Link from "next/link";
import { useTheme } from "@/components/layout/ThemeProvider";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  {
    heading: "Product",
    items: [
      { label: "Features", href: "#features" },
      { label: "Browser Extension", href: "/extension" },
      { label: "Mobile App", href: "/mobile-app" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Socials",
    items: [
      { label: "GitHub", href: "https://github.com/sahilmishra03/Ghostmark" },
      // Added isComingSoon flag here
      { label: "Discord", href: "#", isComingSoon: true },
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
];

// Interactive Tooltip perfectly themed to match Ghostmark UI
const ComingSoonLink = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault(); 
        setIsHovered(true);
        setTimeout(() => setIsHovered(false), 2000); 
      }}
    >
      <span className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
        {children}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute bottom-full left-0 mb-3 w-max z-50 pointer-events-none"
          >
            {/* Themed Popup Box */}
            <div className="relative px-3 py-2 bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-[#333333] shadow-lg dark:shadow-2xl rounded-lg flex items-center gap-2">
              <span className="text-sm leading-none">✨</span>
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 tracking-wide">
                Community coming soon!
              </span>
              
              {/* Tooltip Arrow (Rotated Square to match borders properly) */}
              <div className="absolute -bottom-[5px] left-6 -translate-x-1/2 w-2.5 h-2.5 bg-white dark:bg-[#1e1e1e] border-b border-r border-neutral-200 dark:border-[#333333] rotate-45 rounded-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Footer() {
  const { theme } = useTheme();

  const logoSrc = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <footer className="relative bg-neutral-100 dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-0">
        <div className="border-t border-neutral-300 dark:border-neutral-800 mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                <img src={logoSrc} alt="logo" width={30} height={30} />
              </div>
              <span className="font-semibold text-neutral-900 dark:text-white">Ghostmark</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              © {new Date().getFullYear()} Ghostmark.<br />All rights reserved.
            </p>
          </div>

          {LINKS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">{col.heading}</span>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.isComingSoon ? (
                      <ComingSoonLink>{item.label}</ComingSoonLink>
                    ) : (
                      <Link href={item.href} className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-150">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 select-none pointer-events-none">
          <p className="text-[clamp(4rem,15vw,14rem)] font-bold leading-none tracking-tighter text-neutral-300 dark:text-neutral-900 whitespace-nowrap">
            Ghostmark
          </p>
        </div>
      </div>
    </footer>
  );
}