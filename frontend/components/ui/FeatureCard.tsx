"use client";
import { motion } from "motion/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Pen, Code2, BookOpen, Star, Wrench } from "lucide-react";

const TAGS = [
  { label: "design", icon: Pen, color: "bg-pink-100 text-pink-600 border-pink-200", x: -140, y: -80, rotate: -12, delay: 0 },
  { label: "dev", icon: Code2, color: "bg-blue-100 text-blue-600 border-blue-200", x: 120, y: -100, rotate: 8, delay: 0.15 },
  { label: "read later", icon: BookOpen, color: "bg-amber-100 text-amber-600 border-amber-200", x: -120, y: 60, rotate: -6, delay: 0.3 },
  { label: "inspo", icon: Star, color: "bg-violet-100 text-violet-600 border-violet-200", x: 130, y: 50, rotate: 10, delay: 0.45 },
  { label: "tools", icon: Wrench, color: "bg-green-100 text-green-600 border-green-200", x: 10, y: -140, rotate: 3, delay: 0.6 },
];

export default function SaveFromAnywhereCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <Card className="h-full flex flex-col gap-4" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Orbiting tags */}
        {TAGS.map((tag, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm select-none",
              tag.color
            )}
            animate={hovered
              ? { x: 0, y: 0, rotate: 0, scale: 0.3, opacity: 0 }
              : { x: tag.x, y: tag.y, rotate: tag.rotate, scale: 1, opacity: 1 }
            }
            transition={hovered
              ? { duration: 0.4, delay: i * 0.05, ease: "easeIn" }
              : { duration: 0.5, delay: i * 0.05, ease: "easeOut" }
            }
          >
            <tag.icon className="h-3 w-3" />
            <span>{tag.label}</span>
          </motion.div>
        ))}

        {/* Central bookmark jar */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-1"
          animate={hovered ? { scale: 1.2 } : { scale: [1, 1.04, 1] }}
          transition={hovered
            ? { duration: 0.3, ease: "easeOut" }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="text-6xl select-none">🗂️</div>
          <motion.div
            className="h-1.5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full mt-1"
            animate={hovered ? { scaleX: 1.5 } : { scaleX: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Dotted lines from tags to center */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
          {TAGS.map((tag, i) => {
            const cx = "50%";
            const cy = "50%";
            return (
              <motion.line
                key={i}
                x1={`calc(50% + ${tag.x}px)`}
                y1={`calc(50% + ${tag.y}px)`}
                x2={cx}
                y2={cy}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="text-neutral-300 dark:text-neutral-600"
                animate={hovered
                  ? { opacity: 0 }
                  : { opacity: [0.3, 0.7, 0.3] }
                }
                transition={hovered
                  ? { duration: 0.2, delay: i * 0.04 }
                  : { duration: 2.5, repeat: Infinity, delay: tag.delay, ease: "easeInOut" }
                }
              />
            );
          })}
        </svg>
      </div>

      <div>
        <CardTitle>Everything, organised</CardTitle>
        <CardDescription>
          Tag, sort, and collect bookmarks your way. Find anything in seconds.
        </CardDescription>
      </div>
    </Card>
  );
}

export const Card = ({
  className, children, onMouseEnter, onMouseLeave,
}: {
  className?: string; children: React.ReactNode;
  onMouseEnter?: () => void; onMouseLeave?: () => void;
}) => (
  <div
    className={cn(
      "w-full h-full p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-[rgba(40,40,40,0.70)] bg-gray-50 group overflow-hidden",
      className
    )}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
);

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn("text-lg font-semibold text-gray-800 dark:text-white pb-1", className)}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}>
    {children}
  </p>
);

export const CardSkeletonContainer = ({
  className, children, showGradient = true,
}: {
  className?: string; children: React.ReactNode; showGradient?: boolean;
}) => (
  <div className={cn(
    "h-[15rem] md:h-[20rem] rounded-xl z-40",
    className,
    showGradient && "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
  )}>
    {children}
  </div>
);
