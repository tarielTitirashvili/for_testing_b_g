import dayjs from 'dayjs'

// Dummy event data for demonstration
export type EventsArrayElementType = {
  id: string
  date: dayjs.Dayjs
  endDate: dayjs.Dayjs
  title: string
  description: string
}


export const EventsArray: EventsArrayElementType[] = [
  {
    id: 'ascx34',
    date: dayjs().startOf('day').hour(10),
    endDate: dayjs().startOf('day').hour(11),
    title: 'Meeting with team',
    description: 'We are meeting',
  },
  {
    id: 'ascx35',
    date: dayjs().startOf('day').hour(13),
    endDate: dayjs().startOf('day').hour(13).minute(15),
    title: 'Code review',
    description: 'We are meeting for code review',
  },
    {
    id: 'ascx55',
    date: dayjs().startOf('day').hour(13).minute(15),
    endDate: dayjs().startOf('day').hour(13).minute(30),
    title: 'Code review',
    description: 'We are meeting for code review',
  },
    {
    id: 'ascx31',
    date: dayjs().startOf('day').hour(3),
    endDate: dayjs().startOf('day').hour(7),
    title: 'random',
    description: 'We are meeting for code review',
  },
  {
    id: 'ascx45',
    date: dayjs().startOf('day').hour(23).minute(30),
    endDate: dayjs().startOf('day').add(1, 'day').hour(2),
    title: 'Lasha',
    description: 'We are meeting for code review',
  },
]

type EventType = {
  id: string
  date: dayjs.Dayjs
  endDate: dayjs.Dayjs
  title: string
  description: string
}


export function generateDailyOneHourEvents(daysCount = 7): EventType[] {
  const events: EventType[] = []
  const start = dayjs().startOf('day')

  for (let day = 0; day < daysCount; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const startDate = start.add(day, 'day').add(hour, 'hour')
      const endDate = startDate.add(1, 'hour')

      events.push({
        id: crypto.randomUUID(),
        date: startDate,
        endDate,
        title: `Event ${startDate.format('YYYY-MM-DD HH:mm')}`,
        description: `Event on ${startDate.format('dddd, MMMM D')} at ${startDate.format('HH:mm')}`,
      })
    }
  }

  return events
}

export type CalendarData = {
  [date: string]: EventType[];
};

/**
 * Generate events for day/week/month views.
 * 
 * @param view 'day' | 'week' | 'month'
 * @returns CalendarData with keys in format 'DD/MM/YYYY'
 */
export function generateCalendarEvents(view: 'day' | 'week' | 'month', start = dayjs().startOf('day')): CalendarData {
  const calendarData: CalendarData = {};
  const daysCount = view === 'day' ? 1 : view === 'week' ? 7 : start.daysInMonth();

  for (let day = 0; day < daysCount; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const startDate = start.add(day, 'day').add(hour, 'hour');
      const endDate = startDate.add(1, 'hour');
      const formattedDate = startDate.format('DD/MM/YYYY');

      const event: EventType = {
        id: crypto.randomUUID(),
        date: startDate,
        endDate,
        title: `Event ${startDate.format('YYYY-MM-DD HH:mm')}`,
        description: `Event on ${startDate.format('dddd, MMMM D')} at ${startDate.format('HH:mm')}`,
      };

      if (!calendarData[formattedDate]) {
        calendarData[formattedDate] = [];
      }

      calendarData[formattedDate].push(event);
    }
  }

  return calendarData;
}
