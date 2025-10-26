import type { IRole } from "@/pages/business/settings/components/RolesAndRights";
import type { IAddStaffFormData } from "@/pages/business/teams/staff/AddStaff";
import type { IStaffCard } from "@/pages/business/teams/Team";
import { apiSlice } from "@/redux/APISlice";

export const staffApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getStaff: builder.query<IStaffCard[], void>({
            query: () => ({
                url: "/business/business-staff",
                method: "GET"
            })
        }),

        getBusinessRoles: builder.query<IRole[], void>({
            query: () => ({
                url: "/business/business-roles",
                method: "GET"
            })
        }),

        createStaff: builder.mutation<void, IAddStaffFormData>({
            query: (data) => ({
                url: "/business/register-staff",
                method: "POST",
                data: data
            })
        })
    })
})

export const { 
    useGetStaffQuery,
    useGetBusinessRolesQuery, 
    useCreateStaffMutation
} = staffApiSlice