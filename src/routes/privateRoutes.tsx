import { lazy } from 'react'

import { Navigate } from 'react-router-dom'

// import Calendar from '@/pages/dashboard/calendar'
// import Services from '@/pages/services/Services'
// import Team from '@/pages/teams/Team'
import type { AppRouteObject } from '@/hooks/useGenerateRoutes'
import { Armchair, Bell, Building2, Calendar, CalendarDays, CreditCard, FileText, LayoutDashboard, Star, Users } from 'lucide-react'
import type { TFunction } from 'i18next'
// import BusinessProfile from '@/pages/businessProfile/BusinessProfile'
// import type Subscription from '@/pages/subscription/Subscription'

const DashboardLayout = lazy(() => import('../layout'))
const Dashboard = lazy(() => import('../pages/business/dashboard'))
const CalendarComponent = lazy(() => import('../pages/business/calendar'))
const BusinessProfile = lazy(() => import('../pages/business/businessProfile/BusinessProfile'))
const Services = lazy(() => import('../pages/business/services/Services'))
const Menu = lazy(() => import('../pages/business/menu/Menu'))
const Spaces = lazy(() => import('../pages/business/spaces/Spaces'))
const Team = lazy(() => import('../pages/business/teams/Team'))
const Reviews = lazy(() => import('../pages/business/reviews/Reviews'))
const Subscription = lazy(() => import('../pages/business/subscription/Subscription'))
const Bookings = lazy(() => import('../pages/business/bookings/index'))
const Notifications = lazy(() => import('../pages/business/notifications/Notifications'))
const Settings = lazy(() => import('../pages/business/settings/Settings'))
const NotFound = lazy(() => import('../pages/business/NotFound'))

const privateRoutes = (t: TFunction): AppRouteObject[] => {
  return[
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        title: t("sidebar.link.home"),
        icon: <LayoutDashboard />
      },
      {
        path: '/businessProfile',
        element: <BusinessProfile />,
        title: t("sidebar.link.businessProfile"),
        icon: <Building2 />
      },
      {
        path: '/services',
        title: t("sidebar.link.services"),
        icon: <FileText />,
        children: [
          {
            index: true,
            element: <Navigate to="/services/6" replace />
          },
          {
            path: ':id',
            element: <Services />
          }
        ]
      },
      {
        path: '/menu',
        title: t("sidebar.link.menu"),
        icon: <FileText />,
        children: [
          {
            index: true,
            element: <Navigate to="/menu/6" replace />
          },
          {
            path: ':id',
            element: <Menu />
          }
        ]
      },
      {
        path: '/spaces',
        title: t("sidebar.link.spaces"),
        icon: <Armchair />,
        children: [
          {
            index: true,
            element: <Navigate to="/spaces/6" replace />
          },
          {
            path: ':id',
            element: <Spaces />
          }
        ]
      },
      {
        path: '/books',
        element: <Bookings/>,
        title: t("sidebar.link.books"),
        icon: <Calendar />
      },
      {
        path: '/calendar',
        element: <CalendarComponent />,
        title: t("sidebar.link.calendar"),
        icon: <CalendarDays />
      },
      {
        path: '/team',
        element: <Team />,
        title: t("sidebar.link.team"),
        icon: <Users />
      },
      {
        path: '/reviews',
        element: <Reviews />,
        title: t("sidebar.link.reviews"),
        icon: <Star />
      },
      {
        path: '/notifications',
        element: <Notifications />,
        title: t("sidebar.link.notifications"),
        icon: <Bell />
      },
      {
        path: '/subscription',
        element: <Subscription />,
        title: t("sidebar.link.subscription"),
        icon: <CreditCard />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
]}

export default privateRoutes