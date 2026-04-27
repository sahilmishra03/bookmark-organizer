"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
    | { isStatic: true; imageSrc: string }
    | { isStatic?: false; imageSrc?: never }
  );

// Cache fetched URLs across re-renders so repeat hovers are instant
const preloadCache = new Set<string>();

function buildSrc(url: string, width: number, height: number): string {
  const params = encode({
    url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1,
    "viewport.width": width * 3,
    "viewport.height": height * 3,
  });
  return `https://api.microlink.io/?${params}`;
}

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  const src = isStatic ? imageSrc : buildSrc(url, width, height);

  const [isOpen, setOpen] = React.useState(false);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const isMounted = React.useRef(false);

  // ✅ FIX 1: Eagerly prefetch on mount, not on hover
  React.useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    if (preloadCache.has(src)) {
      setImgLoaded(true); // already fetched before
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImgLoaded(true);
      preloadCache.add(src);
    };
    img.onerror = () => {
      setImgError(true);
    };
    img.src = src;
  }, [src]);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetRect = (event.target as HTMLElement).getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <HoverCardPrimitive.Root
      openDelay={50}
      closeDelay={100}
      onOpenChange={setOpen}
    >
      <HoverCardPrimitive.Trigger
        onMouseMove={handleMouseMove}
        className={cn("text-black dark:text-white", className)}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content
        className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
        side="top"
        align="center"
        sideOffset={10}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="shadow-xl rounded-xl"
              style={{ x: translateX }}
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                style={{ fontSize: 0, width, height }}
              >
                {/* ✅ FIX 2: Loading skeleton while image fetches */}
                {!imgLoaded && !imgError && (
                  <div
                    className="rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse"
                    style={{ width, height }}
                  />
                )}

                {/* ✅ FIX 3: Fallback for sites that block screenshotting */}
                {imgError && (
                  <div
                    className="rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs text-neutral-400"
                    style={{ width, height }}
                  >
                    {new URL(url).hostname}
                  </div>
                )}

                {/* ✅ FIX 4: Only render img after it's confirmed loaded */}
                {imgLoaded && (
                  <img
                    src={src}
                    width={width}
                    height={height}
                    className="rounded-lg"
                    alt="preview image"
                  />
                )}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};