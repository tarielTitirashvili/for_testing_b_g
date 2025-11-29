// import type { IRole } from "@/pages/business/settings/components/RolesAndRights";
// import type { IAddStaffFormData } from "@/pages/business/teams/staff/AddStaff";
import { apiSlice } from "@/redux/APISlice";
import type { Dayjs } from 'dayjs'

type TGetCAlendarBookingsParams = {
    start: string,
    end: string,
    includeExternal: boolean,
    includeInternal: boolean,
    staffIds: string[],
    tableCategoryIds: number[],
    statusIds: number[],
  }
  export interface IRootCalendarResponse {
  staff: [];
  tables: ITableWithOrders[];
}

// export interface StaffMember {
//   // You can add fields if staff objects are not empty
// }

export interface ITableWithOrders {
  table: ITableInfo;
  orders: IOrder[];
}

export interface ITableInfo {
  id: number;
  name: string;
}

export interface IOrder {
  id: number;
  startDate: Dayjs;
  endDate: Dayjs;
  isExternal: boolean;
  status: IOrderStatus;
  services: [] | null;
  tableCategoryId: number;
  guestCount: number;
  price: number | null;
  notes: string;
}

export interface IOrderStatus {
  id: number;
  name: string;
}

// export interface Service {
//   // Add service fields if backend sends them later
// }

export const schedulerCalendarAPISlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCalendarBookings: builder.query<IRootCalendarResponse,TGetCAlendarBookingsParams>({
            query: (params) => ({
                url: "/business/calendar",
                method: "GET",
                params
            })
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
    })
})

export const { 
    useGetCalendarBookingsQuery,
    // useGetBusinessRolesQuery, 
    // useCreateStaffMutation
} = schedulerCalendarAPISlice