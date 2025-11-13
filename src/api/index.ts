import { type BaseQueryFn } from '@reduxjs/toolkit/query'
import { AxiosError, type AxiosRequestConfig } from 'axios'
import axios from "axios";
import { getDispatch } from '@/redux/storeAccessor'
import { logout } from '@/redux/auth/authSlice'
import { apiSlice } from '@/redux/APISlice'
import createErrorToast from '@/utils/createErrorToast'

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const token = localStorage.getItem('accessToken')

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          Authorization: `Bearer ${token || ''}`,
          'Accept-Language': 'ka-GE', // 'en-EN',
          ...headers
        },
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }


  axios.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response)
    return response;
  }, function onRejected(error) {
    const dispatch = getDispatch()

    if(error.status === 401){
      dispatch(logout())
      dispatch(apiSlice.util.resetApiState())
      createErrorToast(error?.response?.data?.title, error?.response?.data?.text)
      return error.title
    }
    if(error.status && error.status !== 400){
      return createErrorToast(error?.response?.data?.title, error?.response?.data?.text)
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });