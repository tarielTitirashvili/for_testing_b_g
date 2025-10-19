// import type { TBusinessBookingTime, IBusinessFormData } from '@/pages/business/businessProfile/BusinessProfile'
import type { IBusiness } from '@/components/shared/profile/Profile'
import type { TSwitchProfileData } from '@/components/shared/profile/ProfileList'
import { apiSlice } from '@/redux/APISlice'
import type { TLoginResponse } from '@/redux/auth/authAPISlice'
import { login } from '@/redux/auth/authSlice'

export const businessProfileAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfiles: builder.query<IBusiness[], void>({
      query: () => ({
        url: '/business/user-profiles',
        method: 'GET',
      }),
    }),

    switchProfile: builder.mutation<TLoginResponse, TSwitchProfileData>({
      query: (data) => ({
        url: '/business/switch-profile',
        method: 'POST',
        data: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(login(data))
          dispatch(apiSlice.util.resetApiState())
        } catch (error) {
          console.error('Login failed:', error)
        }
      },
    }),
  }),
})
// export const { useGetBusinessProfileQuery, useEditBusinessProfileMutation } = businessProfileAPISlice
export const { useGetUserProfilesQuery, useSwitchProfileMutation } =
  businessProfileAPISlice
