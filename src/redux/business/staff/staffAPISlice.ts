import type { IStaffCard } from "@/pages/business/teams/Team";
import { apiSlice } from "@/redux/APISlice";

export const staffApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getStaff: builder.query<IStaffCard[], void>({
            query: () => ({
                url: "/business/business-staff",
                method: "GET"
            })
        })
    })
})

export const { useGetStaffQuery } = staffApiSlice