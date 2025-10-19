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
  id: number
  dateTime: string
  customer: string
  phone: string
  service: string
  teamMember: string
  duration: string
  price: string
  status: number
}

export const BOOKINGS_ARRAY: BookingType[] = [
  {
    id: 1,
    dateTime: "2025-07-01T10:00",
    customer: "Mike Brown",
    phone: "+1 (555) 123-4567",
    service: "თმის შეჭრა",
    teamMember: "Emma Wilson",
    duration: "60 წთ",
    price: "$65",
    status: 3, // confirmed
  },
  {
    id: 2,
    dateTime: "2025-07-02T16:00",
    customer: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    service: "წარბის შეღებვა",
    teamMember: "John Smith",
    duration: "30 წთ",
    price: "$40",
    status: 4, // completed
  },
  {
    id: 3,
    dateTime: "2025-07-03T14:30",
    customer: "Emily Davis",
    phone: "+1 (555) 654-3210",
    service: "თმის შეღება",
    teamMember: "Emma Wilson",
    duration: "120 წთ",
    price: "$120",
    status: 2, // pending
  },
  {
    id: 4,
    dateTime: "2025-07-04T13:00",
    customer: "David Smith",
    phone: "+1 (555) 789-0123",
    service: "თმის შეჭრა",
    teamMember: "John Smith",
    duration: "45 წთ",
    price: "$45",
    status: 5, // cancelled
  },
  {
    id: 5,
    dateTime: "2025-07-05T09:30",
    customer: "Jane Doe",
    phone: "+1 (555) 444-1111",
    service: "წვერის მოჭრა",
    teamMember: "Emma Wilson",
    duration: "25 წთ",
    price: "$30",
    status: 4,
  },
  {
    id: 6,
    dateTime: "2025-07-06T11:15",
    customer: "Alex Turner",
    phone: "+1 (555) 321-0000",
    service: "თმის შეჭრა",
    teamMember: "John Smith",
    duration: "60 წთ",
    price: "$65",
    status: 3,
  },
  {
    id: 7,
    dateTime: "2025-07-07T17:00",
    customer: "Linda Clark",
    phone: "+1 (555) 666-7890",
    service: "მაკიაჟი",
    teamMember: "Emma Wilson",
    duration: "90 წთ",
    price: "$100",
    status: 2,
  },
  {
    id: 8,
    dateTime: "2025-07-08T14:00",
    customer: "Michael Green",
    phone: "+1 (555) 888-2222",
    service: "თმის შეღება",
    teamMember: "John Smith",
    duration: "80 წთ",
    price: "$90",
    status: 5,
  },
  {
    id: 9,
    dateTime: "2025-07-09T12:00",
    customer: "Kate White",
    phone: "+1 (555) 111-7777",
    service: "წარბების კორექცია",
    teamMember: "Emma Wilson",
    duration: "20 წთ",
    price: "$25",
    status: 3,
  },
  {
    id: 10,
    dateTime: "2025-07-10T15:30",
    customer: "John Carter",
    phone: "+1 (555) 999-0000",
    service: "თმის შეჭრა",
    teamMember: "John Smith",
    duration: "45 წთ",
    price: "$50",
    status: 4,
  },
  {
    id: 11,
    dateTime: "2025-07-11T10:00",
    customer: "Sophia Lee",
    phone: "+1 (555) 333-2222",
    service: "თმის შეღება",
    teamMember: "Emma Wilson",
    duration: "100 წთ",
    price: "$95",
    status: 2,
  },
  {
    id: 12,
    dateTime: "2025-07-12T13:45",
    customer: "Brian King",
    phone: "+1 (555) 777-3333",
    service: "წვერის მოჭრა",
    teamMember: "John Smith",
    duration: "30 წთ",
    price: "$35",
    status: 5,
  },
];
