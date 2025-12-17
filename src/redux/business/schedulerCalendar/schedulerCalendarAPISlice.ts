// import type { IRole } from "@/pages/business/settings/components/RolesAndRights";
// import type { IAddStaffFormData } from "@/pages/business/teams/staff/AddStaff";
import { apiSlice } from '@/redux/APISlice'
// import type { Dayjs } from 'dayjs'
import type { IService } from '../service/serviceAPISlice'
import type { IStaff, IStatus } from '../booking/bookingAPISlice'
// import dayjs from 'dayjs'

export interface IRootCalendarResponse {
  staff: IStaffMainObject | null
  tables: ITableMainObject | null
}

interface Client {
  id: string
  firstName: string
  lastName: string
}

interface IPagination {
  offset: number
  page: number
  pageCount: number
  totalItemCount: number
}
interface IStaffMainObject extends IPagination {
  data: StaffOrdersItem[] | []
}
interface ITableMainObject extends IPagination {
  data: ITableWithOrders[] | []
}
export interface StaffOrdersItem {
  staff: IStaff
  orders: IOrder[]
}
export interface ITableWithOrders {
  table: ITableInfo
  orders: IOrder[]
}

type TGetCAlendarBookingsParams = {
  start: string
  end: string
  includeExternal: boolean
  includeInternal: boolean
  staffIds: string | null
  tableCategoryIds: number | null
  statusIds: number[]
  page: number
  offset: number
  TableIds: number | null
}
export interface ITableInfo {
  id: number
  name: string
  category: {
    id: number
    name: string
    tableCategoryTypeId: 1 | 2
  }
}
export interface IOrder {
  id: number
  startDate: string
  endDate: string
  isExternal: boolean
  status: IStatus
  services: IService[] | [] | null
  tableCategoryId: number | null
  guestCount: number | null
  price: number | null
  notes: string | null
  client: Client
}

export const schedulerCalendarAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCalendarBookings: builder.query<
      IRootCalendarResponse,
      TGetCAlendarBookingsParams
    >({
      query: (params) => ({
        url: '/business/calendar',
        method: 'GET',
        params,
      }),
      providesTags: ['calendarBookings']
    }),
  }),
})

export const {
  useGetCalendarBookingsQuery,
} = schedulerCalendarAPISlice
