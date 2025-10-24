import { USER_ROLES } from '@/redux/auth/authSlice'
import privateRoutes from '@/routes/privateRoutes'
import adminRoutes from '@/routes/adminRoutes'
import publicRoutes from '@/routes/publicRoutes'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { selectedBusinessProfileSelector } from '@/redux/auth/authSelectors'

export type AppRouteObject = RouteObject & {
  title?: string
  icon?: ReactNode
  children?: AppRouteObject[]
}

const useGenerateRoutes = () => {
  const { t } = useTranslation()
  const role = useSelector((state: RootState) => state.auth.role)
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const isOtp = useSelector((state: RootState) => state.auth.isOTP)
  const selectedBusinessProfile = useSelector(selectedBusinessProfileSelector)
  
  const routes = (): AppRouteObject[] => {
    if (isAuth && !isOtp) {
      switch (role) {
        case USER_ROLES.ADMINISTRATOR:
          return adminRoutes(t)
        case USER_ROLES.STAFF:
          return privateRoutes(t, selectedBusinessProfile?.businessCategory?.id)
        case USER_ROLES.MANAGER:
          return privateRoutes(t, selectedBusinessProfile?.businessCategory?.id)
        case USER_ROLES.BUSINESS_OWNER:
          return privateRoutes(t, selectedBusinessProfile?.businessCategory?.id)
        default:
          return publicRoutes(isOtp)
      }
    } else {
      return publicRoutes(isOtp)
    }
  }
  return routes
}

export default useGenerateRoutes