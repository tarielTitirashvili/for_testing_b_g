import { Suspense, useEffect } from 'react'

import { useNavigate, useRoutes } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { USER_ROLES, type TRoleType } from '@/redux/auth/authSlice'
import useGenerateRoutes from '@/hooks/useGenerateRoutes'
import Loader from '@/components/shared/loader'

// ssr test for 1 page option is node server which will return static html css file
// calendar library test
// routing
// i18n configuration

const AllRoutes = () => {
  const role = useSelector((state: RootState) => state.auth.role)
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const isOtp = useSelector((state: RootState) => state.auth.isOTP)
  const isLoginProcess = useSelector(
    (state: RootState) => state.auth.isLoginProcess
  )
  
  const navigate = useNavigate()

  //! checks authentication globally if there is token in localstorage
  const {isLoading: loginLoading } = useAuth()
  // returns routes based on user type
  const routes = useGenerateRoutes()
  
  const navigateUser = (isAuth: boolean, role: TRoleType) => {
    // this function runs only when user logs in not on refreshes
    if (isAuth && isLoginProcess) {
      if(isOtp){
        return navigate('/change-Password')
      }
      switch (role) {
        case USER_ROLES.ADMINISTRATOR:
          return navigate('/registration')
        case USER_ROLES.STAFF:
          return navigate('/dashboard')
        case USER_ROLES.MANAGER:
          return navigate('/dashboard')
        case USER_ROLES.BUSINESS_OWNER:
          return navigate('/')
        default:
          return navigate('/')
      }
    }
  }
  useEffect(() => {
    navigateUser(isAuth, role)
  }, [isAuth, role])

  const element = useRoutes(routes())

  if(loginLoading){
    return <Loader size='screen' />
  }

  return (
    <Suspense fallback={<Loader size='screen' />}>
      {element}
    </Suspense>
  )
}

export default AllRoutes
