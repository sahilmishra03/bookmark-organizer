export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks}w ago`
  return `${Math.floor(weeks / 4)}mo ago`
}

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

export function buildTrend(dates: string[], points = 8): number[] {
  if (!dates.length) return Array(points).fill(0)
  const times = dates.map(d => new Date(d).getTime()).sort((a, b) => a - b)
  const now = Date.now()
  const oldest = times[0]
  const span = Math.max(now - oldest, 1)
  return Array.from({ length: points }, (_, i) => {
    const cutoff = oldest + (span * (i + 1)) / points
    return times.filter(t => t <= cutoff).length
  })
}

export function buildRealTrend(dates: string[], points = 8): number[] {
  if (!dates.length) return Array(points).fill(0)
  
  const now = Date.now()
  const timePoints = Array.from({ length: points }, (_, i) => {
    // Create time buckets going backwards from now
    const bucketSize = (7 * 24 * 60 * 60 * 1000) / points // 7 days divided by points
    const bucketStart = now - (bucketSize * (points - i))
    const bucketEnd = now - (bucketSize * (points - i - 1))
    return { start: bucketStart, end: bucketEnd }
  })
  
  // Count items in each time bucket
  const sortedDates = dates.map(d => new Date(d).getTime()).sort((a, b) => a - b)
  return timePoints.map(bucket => {
    return sortedDates.filter(time => time >= bucket.start && time < bucket.end).length
  })
}

export function generateMockTrend(baseValue: number, variance: number = 0.3, points: number = 8): number[] {
  return Array.from({ length: points }, (_, i) => {
    const randomFactor = 1 + (Math.random() - 0.5) * variance
    const trendFactor = 1 + (i / points) * 0.2 // Slight upward trend
    return Math.max(0, Math.round(baseValue * randomFactor * trendFactor))
  })
}
