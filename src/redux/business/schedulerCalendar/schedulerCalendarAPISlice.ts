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

interface  IPagination {
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
  staffIds: string[]
  tableCategoryIds: number[]
  statusIds: number[]
}
interface ITableInfo {
  id: number
  name: string
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
      // transformResponse: (response: IRootCalendarResponse) => {
      //   const localDate = (date: Dayjs| string) => dayjs.utc(date).tz(dayjs.tz.guess())

      //   let formattedStaff: StaffOrdersItem[] | [] = []
      //   if(response.staff.length > 0){
      //     formattedStaff = response.staff.map((staffItem) => {
      //       const formattedOrders = staffItem.orders.map((order) => {
      //         return {
      //           ...order,
      //           startDate: localDate(order.startDate as Dayjs),
      //           endDate: localDate(order.endDate as Dayjs),
      //         }
      //       })
      //       return {...staffItem, orders: formattedOrders}
      //     })
      //   }
      //   return {...response, staff: formattedStaff}
      // },
    }),

    // getBusinessRoles: builder.query<IRole[], void>({
    //     query: () => ({
    //         url: "/business/business-roles",
    //         method: "GET"
    //     })
    // }),

    // createStaff: builder.mutation<void, IAddStaffFormData>({
    //     query: (data) => ({
    //         url: "/business/register-staff",
    //         method: "POST",
    //         data: data
    //     })
    // })
  }),
})

export const {
  useGetCalendarBookingsQuery,
  // useGetBusinessRolesQuery,
  // useCreateStaffMutation
} = schedulerCalendarAPISlice
