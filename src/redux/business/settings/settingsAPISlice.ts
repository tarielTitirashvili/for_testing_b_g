import type { ISettingsProfile } from '@/pages/business/settings/components/MainSettings'
import { apiSlice } from '@/redux/APISlice'

// business/toggle-active-business

export type TActivateBusinessPayload = {
  isActive: boolean
}


export const settingsAPISlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<ISettingsProfile, void>({
          query: () => ({
            url: '/account/profile',
            method: 'GET',
          }),
        }),
        toggleBusinessActiveStatus: builder.mutation<void, TActivateBusinessPayload>({
            query: (data) => ({
                url: "/business/toggle-active-business",
                method: "PUT",
                data
            }),
            invalidatesTags: ['Space'],
        })
    })
})


export const { useToggleBusinessActiveStatusMutation, useGetProfileQuery } = settingsAPISlice