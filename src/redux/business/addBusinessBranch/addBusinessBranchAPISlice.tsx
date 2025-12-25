import type { INewBusinessBranchStep1Data } from '@/pages/business/addBusinessBranch/step1'
import { apiSlice } from '@/redux/APISlice'

export type TBusinessPossibleCategories = {
  id: number
  name: string
}


export const addBusinessBranchAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessPossibleCategories: builder.query<
      TBusinessPossibleCategories[],
      void
    >({
      query: () => ({
        url: '/business/category-dropdown',
        method: 'GET',
      }),
    }),
    getInitiateEmailConfirmation: builder.query<void, void>({
      query: () => ({
        url: '/account/send-confirmation',
        method: 'GET',
      }),
    }),
    getForSendingConfirmationCode: builder.query<
      void,
      { confirmationCode: string }
    >({
      query: (params) => ({
        url: '/account/confirm-email',
        method: 'GET',
        params,
      }),
    }),
    useRegisterBusinessByOwner: builder.mutation<void, INewBusinessBranchStep1Data>({
      query: (tableCategoryData) => ({
        url: '/business/register-business',
        method: 'POST',
        data: tableCategoryData,
      }),
    }),
  }),
})

export const {
  useGetBusinessPossibleCategoriesQuery,
  useGetInitiateEmailConfirmationQuery,
  useLazyGetForSendingConfirmationCodeQuery,
  useUseRegisterBusinessByOwnerMutation
} = addBusinessBranchAPISlice
