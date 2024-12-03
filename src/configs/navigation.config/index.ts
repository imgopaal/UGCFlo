import { NAV_ITEM_TYPE_ITEM } from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
	{
		key: 'flos',
		path: '/flos',
		title: 'Flos',
		translateKey: 'nav.flos',
		icon: 'flos',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [],
		subMenu: [],
	},
	{
		key: 'inbox',
		path: '/inbox',
		title: 'Inbox',
		translateKey: 'nav.inbox',
		icon: 'inbox',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [],
		subMenu: [],
	},
	{
		key: 'orders',
		path: '/orders',
		title: 'Orders',
		translateKey: 'nav.orders',
		icon: 'orders',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [],
		subMenu: [],
	},
]

export default navigationConfig
