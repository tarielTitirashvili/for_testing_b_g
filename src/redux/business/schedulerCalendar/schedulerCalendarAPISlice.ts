// import type { IRole } from "@/pages/business/settings/components/RolesAndRights";
// import type { IAddStaffFormData } from "@/pages/business/teams/staff/AddStaff";
import { apiSlice } from "@/redux/APISlice";

type TGetCAlendarBookingsParams = {
    start: string,
    end: string,
    includeExternal: boolean,
    includeInternal: boolean,
    staffIds: string[],
    tableCategoryIds: number[],
    statusIds: number[],
  }

export const schedulerCalendarAPISlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCalendarBookings: builder.query<void,TGetCAlendarBookingsParams>({
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