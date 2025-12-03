import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { logout, refresh } from '@/redux/auth/authSlice';
import { apiSlice } from '@/redux/APISlice';
import { jwtDecode } from 'jwt-decode';
import { useRefreshCheckerMutation } from '@/redux/auth/authAPISlice';

const shouldRefresh = (token: string) => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const refreshBefore = 2 * 60 * 1000;
    return Date.now() >= exp * 1000 - refreshBefore;
  } catch (e) {
    console.error('Error decoding token', e);
    return false;
  }
};

export function useAuth() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const dispatch = useDispatch()
  const [refreshChecker, { isLoading, isError }] = useRefreshCheckerMutation()

  useEffect(() => {
    const token = localStorage.getItem('accessToken') || '';

    if (token && !isAuth) {
      refreshChecker()
    }
    if(!token && isAuth){
      dispatch(logout())
      dispatch(apiSlice.util.resetApiState())
    }
    if(token && isAuth && shouldRefresh(token)) {
      dispatch(refresh({
        accessToken: localStorage.getItem('accessToken')!,
        refreshToken: localStorage.getItem('refreshToken')!
      }))
      refreshChecker().unwrap().then(data => {
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
      }).catch(() => {
        dispatch(logout())
      })
      shouldRefresh(localStorage.getItem('accessToken')!)
    }
    
  }, [refreshChecker, isAuth]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
    }
  }, [isError]);

  return { isLoading };
}