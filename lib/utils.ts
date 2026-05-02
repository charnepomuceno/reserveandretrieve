import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type CalendarCell = {
  date: Date
  label: number
  currentMonth: boolean
}

export function getMonthCalendarDays(month: Date): CalendarCell[] {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const firstWeekday = new Date(year, monthIndex, 1).getDay()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const daysInPreviousMonth = new Date(year, monthIndex, 0).getDate()
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7

  return Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - firstWeekday + 1

    if (dayNumber <= 0) {
      return {
        date: new Date(year, monthIndex - 1, daysInPreviousMonth + dayNumber),
        label: daysInPreviousMonth + dayNumber,
        currentMonth: false,
      }
    }

    if (dayNumber > daysInMonth) {
      return {
        date: new Date(year, monthIndex + 1, dayNumber - daysInMonth),
        label: dayNumber - daysInMonth,
        currentMonth: false,
      }
    }

    return {
      date: new Date(year, monthIndex, dayNumber),
      label: dayNumber,
      currentMonth: true,
    }
  })
}
