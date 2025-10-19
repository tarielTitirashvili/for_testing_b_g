import { store } from '@/redux/store'
import { logout } from '@/redux/auth/authSlice'
import axios from "axios";

const token = localStorage.getItem('accessToken')

export const api = axios.create({
    baseURL: "https://bookitcrm.runasp.net/api/v1",
    headers: {
        Authorization: `Bearer ${token || ''}`,
        'Content-Type': 'application/json',
    }
})

axios.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function onRejected(error) {
    console.log(error)
    if(error.status === 401){
        store.dispatch(logout())
        return error.title
    }
    if(error.status === 500){
        return error.title
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });