import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'flos',
        path: '/flos',
        component: lazy(() => import('@/views/Flos')),
        authority: [],
    },
    ...othersRoute,
]
