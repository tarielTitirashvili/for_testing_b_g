import { Fragment, type FunctionComponent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { LogOut, Settings } from 'lucide-react'

import bookItLogo from '/assets/images/gegmio.svg'

import { t } from 'i18next'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/auth/authSlice'
import useGenerateRoutes, { type AppRouteObject } from '@/hooks/useGenerateRoutes'
import { apiSlice } from '@/redux/APISlice'

interface IAsideProps {
    basePathName: string | null
}

const Aside: FunctionComponent<IAsideProps> = ({basePathName}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = (): void => {
        navigate('/')
        dispatch(logout())
        dispatch(apiSlice.util.resetApiState())
    }
    const routes = useGenerateRoutes()


    return (
        <Sidebar className='bg-black text-white'>
            <SidebarContent className='bg-black py-6 px-5 flex flex-col aside-scrollbar'>
                <SidebarHeader>
                    <div className="aside_header-wrapper flex items-center gap-3">
                        <span className='bg-[linear-gradient(90deg,#FF3033,#EF7800)] rounded-2xl p-2'>
                            <img
                                src={bookItLogo}
                                alt="Bookit"
                                className='w-[34px]'
                            />
                        </span>
                        <p className='text-sm text-[#AEAEAE]'>
                            { t("sidebar.link.title") }
                        </p>
                    </div>
                </SidebarHeader>
                <SidebarGroup className='flex-1'>
                    <SidebarGroupContent>
                        <SidebarMenu className='flex flex-col gap-3'>
                            {routes()[0]?.children?.map((item: AppRouteObject) => {
                                if(!item.icon || !item.title || !item.path) return <Fragment key={item.path || item.title}></Fragment>
                                return(
                                    <SidebarMenuItem key={item.path} className='text-[#AEAEAE]'>
                                        <SidebarMenuButton isActive={basePathName === item.path} className='h-[48px]'>
                                            <NavLink to={item.path} className={({isActive}) => isActive ? 'flex items-center gap-2 px-3 py-3 ' : 'flex items-center gap-2 px-3 py-3 w-[200px]'}>
                                                <span>{item.icon}</span>
                                                <span>{item.title}</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="line border-[1px] border-[#2B2B2B]"></div>
                <SidebarGroup>
                    <SidebarGroupContent className=''>
                        <SidebarMenu className='flex flex-col gap-3'>
                            <SidebarMenuItem className='text-[#AEAEAE]'>
                                <SidebarMenuButton asChild isActive={basePathName === '/settings'} className='h-[48px]'>
                                    <NavLink to={'/settings'} className={({isActive}) => isActive ? 'flex items-center gap-2 px-5 py-3 ' : 'flex items-center gap-2 px-5 py-3 w-[200px]'}>
                                        <span><Settings /></span>
                                        <span>{ t('sidebar.link.settings') }</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem className='text-[#AEAEAE]'>
                                <SidebarMenuButton onClick={handleLogout} asChild className='h-[48px] w-[230px] cursor-pointer'>
                                    <NavLink to='/' className='flex gap-2 px-5 py-3 w-full'>
                                        <span><LogOut /></span>
                                        <span>{t('sidebar.link.logout') }</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default Aside