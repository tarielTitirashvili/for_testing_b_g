import { useEffect } from 'react'
import { useRefreshCheckerMutation } from '@/redux/auth/authAPISlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { logout } from '@/redux/auth/authSlice'
import { apiSlice } from '@/redux/APISlice'

export function useAuth() {
  // const [skip, setSkip] = useState(true)
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const dispatch = useDispatch()
  const [
    refreshChecker,
    { isLoading, isError },
  ] = useRefreshCheckerMutation()

  // const { data: profileData} = useGetProfileQuery(undefined,{ skip: skip })

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (token && !isAuth) {
      refreshChecker()
    }
    if(!token && isAuth){
      dispatch(logout())
      dispatch(apiSlice.util.resetApiState())
    }
  }, [ isAuth, refreshChecker ])
  useEffect(()=>{
    if(isError){
      dispatch(logout())
      dispatch(apiSlice.util.resetApiState())
    }
  }, [isError])
  return { isLoading }
}
