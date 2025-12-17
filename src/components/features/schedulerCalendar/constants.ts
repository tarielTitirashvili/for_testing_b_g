import dayjs, { Dayjs } from 'dayjs'
// import weekOfYear from 'dayjs/plugin/weekOfYear'

export const CALENDAR_VIEW_OPTIONS = [
  {
    label: 'calendar.text.day',
    value: 'day',
    id: 'day',
  },
  {
    label: 'calendar.text.week',
    value: 'week',
    id: 'week',
  },
  {
    label: 'calendar.text.month',
    value: 'month',
    id: 'month',
  },
]

// dayjs.extend(weekOfYear)

export const isCurrentDay = (day: dayjs.Dayjs) => {
  return day.isSame(dayjs(), 'day')
}

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year()
  const firstDayOfMonth = dayjs().set('month', month).startOf('month').day()

  let dayCounter = -firstDayOfMonth

  return Array.from({ length: 5 }, () =>
    Array.from({ length: 7 }, () => dayjs(new Date(year, month, ++dayCounter)))
  )
}

export const getHours = Array.from({ length: 24 }, (_, i) =>
  dayjs().startOf('day').add(i, 'hour')
)

export const transformToLocalDate = (date: Dayjs | string) =>
  dayjs.utc(date).tz(dayjs.tz.guess()) as Dayjs

export function getWeekDays(date: string | Dayjs) {
  const input = dayjs(date).startOf('day')
  const today = dayjs().startOf('day')

  // ISO week: Monday = 1, Sunday = 7
  const monday = input.startOf('week')

  return Array.from({ length: 7 }, (_, i) => {
    const current = monday.add(i, 'day')

    const monthsDiff = Math.abs(current.diff(today, 'month', true))
    const isFarFromToday = monthsDiff > 1

    return {
      date: current,
      isCurrentDay: current.isSame(today, 'day'),
      isFarFromToday,
      isBeforeToday: current.isBefore(today, 'day'),
    }
  })
}

export const STATUS_BOOKING_EVENTS = {
  pending: {
    id: 2,
    label: 'business.statusBookings.pending',
  },
  confirmed: {
    id: 3,
    label: 'business.statusBookings.confirmed',
  },
  completed: {
    id: 4,
    label: 'business.statusBookings.completed',
  },
  cancelled: {
    id: 5,
    label: 'business.statusBookings.cancelled',
  },
  cancelledBySystem: {
    id: 6,
    label: 'business.statusBookings.cancelledBySystem',
  },
  doNotShowUp: {
    id: 7,
    label: 'business.statusBookings.DontShowUp',
  },
  doNotShowUpBySystem: {
    id: 8,
    label: 'business.statusBookings.DontShowUpBySystem',
  },
} as const

export const STATUSES_BOOKING_EVENTS_ARRAY = [
  {
    id: STATUS_BOOKING_EVENTS.pending.id,
    label: STATUS_BOOKING_EVENTS.pending.label,
  },
  {
    id: STATUS_BOOKING_EVENTS.confirmed.id,
    label: STATUS_BOOKING_EVENTS.confirmed.label,
  },
  {
    id: STATUS_BOOKING_EVENTS.completed.id,
    label: STATUS_BOOKING_EVENTS.completed.label,
  },
  {
    id: STATUS_BOOKING_EVENTS.cancelled.id,
    label: STATUS_BOOKING_EVENTS.cancelled.label,
  },
  {
    id: STATUS_BOOKING_EVENTS.cancelledBySystem.id,
    label: STATUS_BOOKING_EVENTS.cancelledBySystem.label,
  },
  {
    id: STATUS_BOOKING_EVENTS.doNotShowUp.id,
    label: STATUS_BOOKING_EVENTS.doNotShowUp.label,
  },
  {
    id: STATUS_BOOKING_EVENTS.doNotShowUpBySystem.id,
    label: STATUS_BOOKING_EVENTS.doNotShowUpBySystem.label,
  },
]
