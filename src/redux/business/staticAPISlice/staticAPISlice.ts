import type { TGenderOption } from '@/pages/admin/users'
import { apiSlice } from '../../APISlice'

export type TBusinessCategory = {
  id: number
  name: string
}

export const staticAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // business categories
    getBusinessCategories: builder.query<TBusinessCategory[], void>({
      query: () => ({
        url: '/admin/get-business-categories',
        method: 'GET',
      }),
      keepUnusedDataFor: 3600, // keep for 1 hour (so it doesn’t refetch often)
    }),

    // Region
    getRegions: builder.query<{ id: string, name: string }[], void>({
      query: () => ({
        url: "/public/regions",
        method: "GET"
      })
    }),

    // district
    getDistrict: builder.query<{ id: string, name: string }[], number | null>({
      query: (id) => ({
        url: `/public/districts/${id}`,
        method: "GET"
      })
    }),
    getGenderDropdown: builder.query<TGenderOption[], void>({
      query: () => ({
        url: '/account/gender-dropdown',
        method: "GET"
      })
    })

  }),
})
  
export const { 
  useGetBusinessCategoriesQuery,
  useGetRegionsQuery,
  useGetDistrictQuery,
  useGetGenderDropdownQuery
} = staticAPISlice