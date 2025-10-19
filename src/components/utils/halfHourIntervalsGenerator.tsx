function generateHalfHourIntervals(): string[] {
  const intervals: string[] = []

  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const h = hour.toString().padStart(2, '0')
      const m = minute.toString().padStart(2, '0')
      intervals.push(`${h}:${m}`)
    }
  }

  return intervals
}

// Example usage
export const HALF_HOUR_TIME_INTERVALS = generateHalfHourIntervals()
export type HalfHourTimeIntervals = typeof HALF_HOUR_TIME_INTERVALS[number]

