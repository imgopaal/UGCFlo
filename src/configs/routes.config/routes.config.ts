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
    ...othersRoute,
]
