"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: number
  icon: LucideIcon
  color: string
  index: number
  trend: number[]
}

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 900
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target])

  return <>{count}</>
}

function Sparkline({ data }: { data: number[] }) {
  const w = 120
  const h = 40
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h * 0.85
    return `${x},${y}`
  })

  const linePath = `M ${points.join(" L ")}`
  const areaPath = `M 0,${h} L ${points.join(" L ")} L ${w},${h} Z`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${data[0]}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#grad-${data[0]})`}
        className="text-neutral-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-neutral-400 dark:text-neutral-500"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      />
      <motion.circle
        cx={points[points.length - 1].split(",")[0]}
        cy={points[points.length - 1].split(",")[1]}
        r="2.5"
        className="fill-neutral-600 dark:fill-neutral-300"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, delay: 1 }}
      />
    </svg>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

export default function StatCard({ label, value, icon: Icon, color, index, trend }: StatCardProps) {
  const last = trend[trend.length - 1]
  const prev = trend[trend.length - 2]
  const delta = last - prev
  const up = delta >= 0

  return (
    <motion.div
      variants={fadeUp}
      className={`p-5 flex flex-col gap-4 ${index !== 2 ? "border-r border-neutral-200 dark:border-neutral-800" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
            <Icon size={15} className={color} />
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
        </div>
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${up ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400"}`}>
          {up ? "+" : ""}{delta}
        </span>
      </div>

      <p className="text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        <CountUp target={value} />
      </p>

      <Sparkline data={trend} />
    </motion.div>
  )
}
