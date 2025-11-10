import { lazy } from 'react'
import { BriefcaseBusiness, Globe, HousePlus, LanguagesIcon, UserRoundCog, UserRoundPlus } from 'lucide-react'
import type { TFunction } from 'i18next'
import type { AppRouteObject } from '@/hooks/useGenerateRoutes'
import BusinessCategories from '@/pages/admin/businessCategories/BusinessCategories'

const Registration = lazy(() => import('../pages/admin/registrations/Registration'))
const NotFound = lazy(() => import('../pages/business/NotFound'))
const DashboardLayout = lazy(() => import('../layout'))
const Settings = lazy(() => import('../pages/business/settings/Settings'))
const RegisterNewBranch = lazy(() => import('../pages/admin/registrations/RegisterNewBranch'))
const Users = lazy(() => import('../pages/admin/users'))
const Regions = lazy(() => import('../pages/admin/regions/Regions'))
const Districts = lazy(() => import('../pages/admin/districts/Districts'))
const Languages = lazy(() => import('../pages/admin/languages/Language'))

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
        title: t('register-new-branch.title'),
        icon: <HousePlus />,
      },
      {
        path: '/manage-users',
        element: <Users />,
        title: t('manageUsers.title'),
        icon: <UserRoundCog />,
      },
      {
        path: "/manageRegions",
        element: <Regions />,
        title: t('sidebar.link.manageRegions'),
        icon: <Globe />
      },
      {
        path: "/manageDistrict",
        element: <Districts />,
        title: t('sidebar.link.manageDistrict'),
        icon: <Globe />
      },
      {
        path: "/manageBusinessCategories",
        element: <BusinessCategories />,
        title: t('sidebar.link.manageBusinessCategories'),
        icon: <BriefcaseBusiness />
      },
      {
        path: "/manageLanguages",
        element: <Languages />,
        title: t('sidebar.link.manageLanguages'),
        icon: <LanguagesIcon />
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
