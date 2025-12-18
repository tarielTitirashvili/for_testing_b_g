import dayjs, { Dayjs } from 'dayjs'
import { t } from 'i18next'
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

export const backgroundColorByBookingStatus = (id: number) => {
  switch (id) {
    case STATUS_BOOKING_EVENTS.pending.id: // pending
      return '#FBF1D0'
    case STATUS_BOOKING_EVENTS.confirmed.id: // confirmed
      return '#E5EFFF'
    case STATUS_BOOKING_EVENTS.completed.id: //completed
      return '#E6F9ED'
    case STATUS_BOOKING_EVENTS.cancelled.id: // cancelled
      return '#FDE9E9'
    case STATUS_BOOKING_EVENTS.cancelledBySystem.id: // cancelledBySystem
      return '#FDE9E9'
    case STATUS_BOOKING_EVENTS.doNotShowUp.id: // DontShowUp
      return '#F0E7FD'
    case STATUS_BOOKING_EVENTS.doNotShowUpBySystem.id: // DontShowUpBySystem
      return '#F0E7FD'
    default:
      return '#D3D3D3'
  }
}
export const lineColorByBookingStatus = (id: number) => {
  switch (id) {
    case STATUS_BOOKING_EVENTS.pending.id: // pending
      return '#EAB305'
    case STATUS_BOOKING_EVENTS.confirmed.id: // confirmed
      return '#3B81F6'
    case STATUS_BOOKING_EVENTS.completed.id: //completed
      return '#21C55D'
    case STATUS_BOOKING_EVENTS.cancelled.id: // cancelled
      return '#E81C1C'
    case STATUS_BOOKING_EVENTS.cancelledBySystem.id: // cancelledBySystem
      return '#E81C1C'
    case STATUS_BOOKING_EVENTS.doNotShowUp.id: // DontShowUp
      return '#6011D0'
    case STATUS_BOOKING_EVENTS.doNotShowUpBySystem.id: // DontShowUpBySystem
      return '#6011D0'
    default:
      return '#A9A9A9'
  }
}

export function getRelativeDayLabel(date: dayjs.Dayjs) {
  const today = dayjs().startOf('day')
  const target = date.startOf('day')

  const diff = target.diff(today, 'day')

  switch (diff) {
    case -2:
      return t('business.schedulerCalendar.bookings.dayBeforeYesterday')
    case -1:
      return t('business.schedulerCalendar.bookings.Yesterday')
    case 0:
      return t('business.schedulerCalendar.bookings.Today')
    case 1:
      return t('business.schedulerCalendar.bookings.Tomorrow')
    case 2:
      return t('business.schedulerCalendar.bookings.dayAfterTomorrow')
    default:
      return target.format('DD MMM YYYY')
  }
}
