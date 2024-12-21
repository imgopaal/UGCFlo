import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'flos',
        path: '/flos',
        component: lazy(() => import('@/views/Flos/page')),
        authority: [],
    },
    {
        key: 'flos/new',
        path: '/flos/new',
        component: lazy(() => import('@/views/Flos/New/page')),
        authority: [],
    },
    {
        key: 'inbox',
        path: '/inbox',
        component: lazy(() => import('@/views/Inbox/page')),
        authority: [],
    },
    {
        key: 'orders',
        path: '/orders',
        component: lazy(() => import('@/views/Orders/page')),
        authority: [],
    },
    {
        key: 'edit-profile',
        path: '/edit-profile',
        component: lazy(() => import('@/views/EditProfile/page')),
        authority: [],
    },
    {
        key: 'profile',
        path: '/profile',
        component: lazy(() => import('@/views/Profile/page')),
        authority: [],
    },
    {
        key: 'help-centre',
        path: '/help-centre',
        component: lazy(() => import('@/views/HelpCentre/page')),
        authority: [],
    },
    {
        key: 'contracts',
        path: '/contracts',
        component: lazy(() => import('@/views/Contracts/page')),
        authority: [],
    },
    ...othersRoute,
]
