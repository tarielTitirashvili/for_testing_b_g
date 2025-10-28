import { lazy } from 'react'
import { HousePlus, UserRoundCog, UserRoundPlus } from 'lucide-react'
import type { TFunction } from 'i18next'
import type { AppRouteObject } from '@/hooks/useGenerateRoutes'

const Registration = lazy(() => import('../pages/admin/registrations/Registration'))
const NotFound = lazy(() => import('../pages/business/NotFound'))
const DashboardLayout = lazy(() => import('../layout'))
const Settings = lazy(() => import('../pages/business/settings/Settings'))
const RegisterNewBranch = lazy(() => import('../pages/admin/registrations/RegisterNewBranch'))
const Users = lazy(() => import('../pages/admin/users'))

const publicRoutes = (t: TFunction): AppRouteObject[] => [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/registration',
        element: <Registration />,
        title: t('registration.title'),
        icon: <UserRoundPlus />,
      },
      {
        path: '/register-new-branch',
        element: <RegisterNewBranch />,
        title: t('registerNewBranch.title'),
        icon: <HousePlus />,
      },
      {
        path: '/manage-users',
        element: <Users />,
        title: t('manageUsers.title'),
        icon: <UserRoundCog />,
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]

export default publicRoutes
