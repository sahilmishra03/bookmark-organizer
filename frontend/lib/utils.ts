import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseTagInput(value: string): string[] {
  const tags = value
    .split(",")
    .map(tag => tag.trim().replace(/^#+/, "").toLowerCase())
    .filter(Boolean)

  return Array.from(new Set(tags))
}

export function formatTagInput(tags: string[] = []): string {
  return tags.join(", ")
}
