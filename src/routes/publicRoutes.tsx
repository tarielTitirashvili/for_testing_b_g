import type { AppRouteObject } from '@/hooks/useGenerateRoutes'
import ChangePassword from '@/pages/auth/changePassword'
import { lazy } from 'react'

const Authorization = lazy(() => import('../pages/auth/Authorization'))
// const Registration = lazy(() => import('../pages/auth/Registration'))
const ResetPassword = lazy(
  () => import('../pages/auth/resetPassword/ResetPasswordStep1')
)
const ConfirmResetPassword = lazy(
  () => import('../pages/auth/resetPassword/ResetPasswordStep2')
)
// const NotFound = lazy(() => import('../pages/NotFound'))

const publicRoutes = (isOtp: boolean): AppRouteObject[] => {
  const basePublicRoutes = [
    {
      path: '/',
      element: <Authorization />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
    {
      path: '/confirm-reset-password',
      element: <ConfirmResetPassword />,
    },
    {
      path: '*',
      element: <Authorization />,
    },
  ]
  const changePassword = {
    path: '/change-password',
    element: <ChangePassword />,
  }
  if (isOtp === true) {
    return [changePassword, ...basePublicRoutes]
  }
  return basePublicRoutes
}

export default publicRoutes
