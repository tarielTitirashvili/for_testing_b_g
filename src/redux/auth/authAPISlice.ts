import type { RegistrationCredentialsType } from '@/pages/admin/registrations/Registration'
import { apiSlice } from '../APISlice'
import type { IUserAuth } from '@/types/user/user.type'
import type { IAuthFormData } from '@/pages/auth/Authorization'
import { login } from './authSlice'
import type { IResetFormData } from '@/pages/auth/resetPassword/ResetPasswordStep1'
import type { IResetConfirmationFormData } from '@/pages/auth/resetPassword/ResetPasswordStep2'
import type { IChangePasswordFormDataFormData } from '@/pages/auth/changePassword'
import type { TRegisterNewBranchCredentials } from '@/pages/admin/registrations/RegisterNewBranch'

export type TBusinessCategory = {
  id: number
  name: string
}

export type TLoginResponse = {
  accessToken: string
  isOTP: boolean
  refreshToken: string
  roleId: string
}

type payloadType = RegistrationCredentialsType | TRegisterNewBranchCredentials

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<TBusinessCategory[], void>({
      query: () => ({
        url: '/account/profile',
        method: 'GET',
      }),
    }),
    refreshChecker: builder.mutation<TLoginResponse, void>({
      query: () => {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')

        return {
          url: '/account/refresh',
          method: 'POST',
          data: {
            accessToken,
            refreshToken,
          },
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const accessToken = localStorage.getItem('accessToken')
        try {
          const response = await queryFulfilled
          dispatch(login({...response.data, accessToken}))
        } catch (error) {
          console.error('Login failed:', error)
        }
      },
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    loginUser: builder.mutation<TLoginResponse, IAuthFormData>({
      query: (payload) => ({
        url: '/account/login',
        method: 'POST',
        data: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(login({...data, isLoginProcess: true}))
        } catch (error) {
          console.error('Login failed:', error)
        }
      },
    }),
    resetPasswordRequest: builder.mutation<
      void,
      IResetFormData
    >({
      query: (payload: IResetFormData) => {
        return {
          url: '/account/password-reset',
          method: 'POST',
          params: payload,
        }
      },
    }),
    resetPasswordConfirmationRequest: builder.mutation<
      void,
      IResetConfirmationFormData
    >({
      query: (payload: IResetConfirmationFormData) => {
        return {
          url: '/account/password-confirmation',
          method: 'POST',
          data: payload,
        }
      },
    }),
    changePasswordRequest: builder.mutation<
      void,
      IChangePasswordFormDataFormData
    >({
      query: (payload: IChangePasswordFormDataFormData) => {
        return {
          url: '/account/change-password',
          method: 'POST',
          data: payload,
        }
      },
    }),
    registerBusinessAndOwner: builder.mutation<
      IUserAuth,
      payloadType
    >({
      query: (payload: RegistrationCredentialsType) => {
        return {
          url: '/business/register-business-and-owner',
          method: 'POST',
          data: payload,
        }
      },
    }),
  }),
})

export const {
  useLogOutUserMutation,
  useRegisterBusinessAndOwnerMutation,
  useLoginUserMutation,
  useGetProfileQuery,
  useRefreshCheckerMutation,
  useResetPasswordRequestMutation,
  useResetPasswordConfirmationRequestMutation,
  useChangePasswordRequestMutation
} = authApiSlice
