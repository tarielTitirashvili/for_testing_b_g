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


export const getHours = Array.from({ length: 96 }, (_, i) =>
  dayjs().startOf('day').add(i * 15, 'minute')
);

export const transformToLocalDate = (date: Dayjs | string) => dayjs.utc(date).tz(dayjs.tz.guess()) as Dayjs


export function getWeekDays(date: string | Dayjs) {
  const input = dayjs(date).startOf("day");
  const today = dayjs().startOf("day");

  // ISO week: Monday = 1, Sunday = 7
  const monday = input.startOf("week");

  return Array.from({ length: 7 }, (_, i) => {
    const current = monday.add(i, "day");

    const monthsDiff = Math.abs(current.diff(today, "month", true));
    const isFarFromToday = monthsDiff > 1;

    return {
      date: current,
      isCurrentDay: current.isSame(today, "day"),
      isFarFromToday
    };
  });
}