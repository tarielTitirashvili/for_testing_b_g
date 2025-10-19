import { CALENDAR_VIEW_OPTIONS } from '@/components/features/schedulerCalendar/constants'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

interface SchedulerCalendarState {
  selectedView: string
  selectedMonthIndex: number
}

const initialState : SchedulerCalendarState = {
  selectedView: CALENDAR_VIEW_OPTIONS[1].value, //'month'
  selectedMonthIndex: dayjs().month()
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
    setSelectedMonthIndexBy: (state, action: PayloadAction<number>) =>{
      if(state.selectedMonthIndex + action.payload >11){
        state.selectedMonthIndex = 0
      }else if (state.selectedMonthIndex + action.payload < 0){
        state.selectedMonthIndex = 11
      }else{
        state.selectedMonthIndex = state.selectedMonthIndex + action.payload
      }
    },
    setSelectedMonthIndex: (state, action: PayloadAction<number>) =>{
      state.selectedMonthIndex = action.payload
    }
  }
})

export const { setSelectedView, setSelectedMonthIndexBy, setSelectedMonthIndex } = schedulerCalendarSlice.actions

export default schedulerCalendarSlice.reducer