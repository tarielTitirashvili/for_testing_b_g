import { lazy } from 'react'

// import Calendar from '@/pages/dashboard/calendar'
// import Services from '@/pages/services/Services'
// import Team from '@/pages/teams/Team'
import type { AppRouteObject } from '@/hooks/useGenerateRoutes'
import {
  Armchair,
  Bell,
  Building2,
  Calendar,
  CalendarDays,
  CreditCard,
  FileText,
  LayoutDashboard,
  Star,
  Users,
} from 'lucide-react'
import type { TFunction } from 'i18next'
// import BusinessProfile from '@/pages/businessProfile/BusinessProfile'
// import type Subscription from '@/pages/subscription/Subscription'

const DashboardLayout = lazy(() => import('../layout'))
const Dashboard = lazy(() => import('../pages/business/dashboard'))
const CalendarComponent = lazy(() => import('../pages/business/calendar'))
const BusinessProfile = lazy(
  () => import('../pages/business/businessProfile/BusinessProfile')
)
const Services = lazy(() => import('../pages/business/services/Services'))
const Menu = lazy(() => import('../pages/business/menu/Menu'))
const Spaces = lazy(() => import('../pages/business/spaces/Spaces'))
const Team = lazy(() => import('../pages/business/teams/Team'))
const Reviews = lazy(() => import('../pages/business/reviews/Reviews'))
const Subscription = lazy(
  () => import('../pages/business/subscription/Subscription')
)
const Bookings = lazy(() => import('../pages/business/bookings/index'))
const Notifications = lazy(
  () => import('../pages/business/notifications/Notifications')
)
const AcceptInvitation = lazy(() => import('../pages/business/acceptInvitation/AcceptInvitation'))
const Settings = lazy(() => import('../pages/business/settings/Settings'))
const NotFound = lazy(() => import('../pages/business/NotFound'))
const AddBusiness = lazy(() => import('../pages/business/addBusinessBranch'))

const privateRoutes = (
  t: TFunction,
  categoryId: 1 | 2 | undefined
): AppRouteObject[] => {
  const routesBasedOnCategory = (): AppRouteObject[] => {
    switch (categoryId) {
      case 1:
        return [
          {
            path: '/menu',
            title: t('sidebar.link.menu'),
            icon: <FileText />,
            element: <Menu />,
            children: [
              {
                path: ':id',
                element: <Menu />,
              },
            ],
          },
          {
            path: '/spaces',
            title: t('sidebar.link.spaces'),
            icon: <Armchair />,
            element: <Spaces />,
            children: [
              {
                path: ':id',
                element: <Spaces />,
              },
            ],
          },
        ]
      case 2:
        return [
          {
            path: '/services',
            title: t('sidebar.link.services'),
            icon: <FileText />,
            element: <Services />,
            children: [
              {
                path: ':id',
                element: <Services />,
              },
            ],
          },
        ]
      default:
        return []
    }
  }

  return [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
          title: t('sidebar.link.home'),
          icon: <LayoutDashboard />,
        },
        {
          path: '/businessProfile',
          element: <BusinessProfile />,
          title: t('sidebar.link.businessProfile'),
          icon: <Building2 />,
        },
        ...routesBasedOnCategory(),
        {
          path: '/books',
          element: <Bookings />,
          title: t('sidebar.link.books'),
          icon: <Calendar />,
        },
        {
          path: '/calendar',
          element: <CalendarComponent />,
          title: t('sidebar.link.calendar'),
          icon: <CalendarDays />,
        },
        {
          path: '/team',
          element: <Team />,
          title: t('sidebar.link.team'),
          icon: <Users />,
        },
        {
          path: '/reviews',
          element: <Reviews />,
          title: t('sidebar.link.reviews'),
          icon: <Star />,
        },
        {
          path: '/notifications',
          element: <Notifications />,
          title: t('sidebar.link.notifications'),
          icon: <Bell />,
        },
        {
          path: '/subscription',
          element: <Subscription />,
          title: t('sidebar.link.subscription'),
          icon: <CreditCard />,
        },
        {
          path: '/settings',
          element: <Settings />,
        },
        {
          path: '*',
          element: <NotFound />,
        },

      ],
    },
    {
      path: '/accept-invitation',
      element: <AcceptInvitation />
    },
    {
      path: '/add-business-branch',
      element: <AddBusiness />,
      title: t('business.addBusinessBranch.title'),
    },
  ]
}

export default privateRoutes
