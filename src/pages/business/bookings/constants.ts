export const BOOKING_STATUS_OPTIONS = [
  { id: 1, value: 1, label: 'bookings.statusOptions.all' },
  { id: 2, value: 2, label: 'bookings.statusOptions.pending' },
  { id: 3, value: 3, label: 'bookings.statusOptions.confirmed' },
  { id: 4, value: 4, label: 'bookings.statusOptions.completed' },
  { id: 5, value: 5, label: 'bookings.statusOptions.cancelled' },
]

export const BOOKING_ITEM_STATUSES = {
  ALL: 1,
  PENDING: 2,
  CONFIRMED: 3,
  COMPLETED: 4,
  CANCELLED: 5,
  NO_SHOW: 6,
} as const;

export const BOOKING_STATUS_LABELS_BY_ID = {
  2: { label: 'bookings.statusOptions.pending', variant: 'pending' },
  3: { label: 'bookings.statusOptions.confirmed', variant: 'confirmed' },
  4: { label: 'bookings.statusOptions.completed', variant: 'completed' },
  5: { label: 'bookings.statusOptions.cancelled', variant: 'canceled' },
  6: { label: 'bookings.texts.noShow', variant: 'noShow' },
}as const;

export const BOOKING_TIME_OPTIONS = [
  { id: 1, value: 1, label: 'bookings.timeOptions.all' },
  { id: 2, value: 2, label: 'bookings.timeOptions.today' },
  { id: 3, value: 3, label: 'bookings.timeOptions.tomorrow' },
  { id: 4, value: 4, label: 'bookings.timeOptions.thisWeek' },
  { id: 5, value: 5, label: 'bookings.timeOptions.nextMonth' },
]

export type BookingType = {
  UId: number
  id: number
  dateTime: string
  customer: string
  phone: string | null
  service?: string
  teamMember?: string
  duration?: string
  price?: string
  guestsAmount?: number
  table?: string
  status: number
}
