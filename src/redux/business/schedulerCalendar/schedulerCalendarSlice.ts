import { CALENDAR_VIEW_OPTIONS } from '@/components/features/schedulerCalendar/constants'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

interface SchedulerCalendarState {
  selectedView: string
}

const initialState : SchedulerCalendarState = {
  selectedView: CALENDAR_VIEW_OPTIONS[1].value, //'month'
}

export type calendarEventType = {
  id: string
  title: string
  date: dayjs.Dayjs
  description: string
}

const schedulerCalendarSlice = createSlice({
  name: 'scheduleCalendar',
  initialState,
  reducers:{
    setSelectedView: (state, action: PayloadAction<string>) => {
      state.selectedView = action.payload
    },
  }
})
// currently this is constant but i will left it here in case if something new will add in calendar
export const { setSelectedView } = schedulerCalendarSlice.actions

export default schedulerCalendarSlice.reducer