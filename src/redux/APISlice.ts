// src/app/apiSlice.ts
import { axiosBaseQuery } from '@/api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://bookitcrm.runasp.net/api/v1',
  }),
  tagTypes: ['User', 'Space', 'SpaceCategory', 'Service', 'Category', 'adminUsers'], // optional, for cache invalidation
  endpoints: () => ({}), // empty for now
  keepUnusedDataFor: 0,        // 💡 don't keep cache after unsubscribing
  refetchOnMountOrArgChange: true, // 💡 refetch every time hook mounts or args change
  // refetchOnFocus: true,        // optional: refetch when window gains focus
  refetchOnReconnect: true,    // optional: refetch when back online
})