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
    getEmailConfirmationReady: builder.query<
      TBusinessPossibleCategories[],
      void
    >({
      query: () => ({
        url: '/account/email-confirmation',
        method: 'GET',
      }),
    }),
  }),
})
// https://bookitcrm.runasp.net/api/v1/account/confirm-email?confirmationCode=
export const {
  useGetBusinessPossibleCategoriesQuery,
  useGetEmailConfirmationReadyQuery,
} = addBusinessBranchAPISlice
