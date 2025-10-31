import type { IAddDistrictFormData } from "@/pages/admin/districts/components/AddDistrict";
import type { IAddRegionFormData, IEditRegionFormData } from "@/pages/admin/regions/components/AddRegion";
import type { IRegion, IRegionDetail } from "@/pages/admin/regions/Regions";
import { apiSlice } from "@/redux/APISlice";

export interface IDistrict {
    id: number;
    name: string;
}

export const regionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Regions
        getAllRegion: builder.query<IRegion[], void>({
            query: () => ({
                url: "/admin/get-regions",
                method: "GET"
            }),
            providesTags: ['Region']
        }),

        getRegionById: builder.query<IRegionDetail, number| undefined>({
            query: (regionId) => ({
                url: `/admin/get-region/${regionId}`,
                method: "GET"
            })
        }),

        addRegion: builder.mutation<void, IAddRegionFormData>({
            query: (data) => ({
                url: "/admin/add-region",
                method: "POST",
                data,
            }),
            invalidatesTags: ["Region"]
        }),

        editRegion: builder.mutation<void, IEditRegionFormData>({
            query: (data) => ({
                url: "/admin/edit-region",
                method: "PUT",
                data
            }),
            invalidatesTags: ["Region"]
        }),

        deleteRegion: builder.mutation<void, number | undefined>({
            query: (regionId) => ({
                url: `/admin/delete-region/${regionId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Region"]
        }),


        // Districts
        getAllDistricts: builder.query<IDistrict[], { regionId?: number } | undefined>({
            query: (params) => ({
                url: "/admin/get-districts",
                method: "GET",
                params
            }),
            providesTags: ["District"]
        }),

        getDistrictById: builder.query<IAddDistrictFormData, number | undefined>({
            query: (districtId) => ({
                url: `/admin/get-district/${districtId}`,
                method: "GET"
            })
        }),

        createDistrict: builder.mutation<void, IAddDistrictFormData>({
            query: (data) => ({
                url: "/admin/add-district",
                method: "POST",
                data
            }),
            invalidatesTags: ["District"]
        }),

        editDistrict: builder.mutation<void, IEditRegionFormData>({
            query: (data) => ({
                url: "/admin/edit-district",
                method: "PUT",
                data
            }),
            invalidatesTags: ["District"]
        }),

        deleteDistrict: builder.mutation<void, number | undefined>({
            query: (districtId) => ({
                url: `/admin/delete-district/${districtId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["District"]
        })

    })
})

export const {
    // region
    useGetAllRegionQuery,
    useGetRegionByIdQuery,
    useAddRegionMutation,
    useEditRegionMutation,
    useDeleteRegionMutation,

    // district
    useGetAllDistrictsQuery,
    useGetDistrictByIdQuery,
    useCreateDistrictMutation,
    useEditDistrictMutation,
    useDeleteDistrictMutation
} = regionApiSlice