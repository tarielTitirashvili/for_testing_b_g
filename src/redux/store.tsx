import { configureStore } from '@reduxjs/toolkit'
import schedulerCalendarReducer from './business/schedulerCalendar/schedulerCalendarSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './APISlice'
import authReducer from './auth/authSlice'

export const store = configureStore({
  reducer: {
    schedulerCalendar: schedulerCalendarReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(apiSlice.middleware)
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
