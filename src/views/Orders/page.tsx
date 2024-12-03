import { useMemo, useState } from 'react'
import { OrderFilters as OrderFiltersType, SortOption } from './types'
import { filterOrders, sortOrders } from '@/utils/orders/orderUtils'
import { mockOrders } from '@/mock/data/commonData'
import { FilterModal, OrderCard, SortMenu, ViewToggle } from '@/components/pages/Flo/Orders'
import { Button, Input } from '@/components/ui'

const Orders = () => {
	const [view, setView] = useState<'creator' | 'brand'>('brand')
	const [searchQuery, setSearchQuery] = useState('')
	const [filters, setFilters] = useState<OrderFiltersType>({})
	const [sort, setSort] = useState<SortOption>({ field: 'deadline', direction: 'asc' })
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

	const filteredOrders = useMemo(() => {
		const filtered = filterOrders(mockOrders, filters, searchQuery)
		return sortOrders(filtered, sort)
	}, [filters, searchQuery, sort])

	return (
		<div>
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-2xl font-semibold text-gray-900">{view === 'brand' ? 'Orders' : 'Active Jobs'}</h1>
				<ViewToggle view={view} onViewChange={setView} />
			</div>

			<div className="flex flex-col gap-4 mb-6">
				<div className="flex gap-4">
					<div className="flex-1">
						<Input
							type="text"
							placeholder={`Search ${view === 'brand' ? 'orders' : 'jobs'}...`}
							className="bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
					</div>
					<Button
						className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
						onClick={() => setIsFilterModalOpen(true)}
					>
						Filters
					</Button>
					<SortMenu onSort={setSort} currentSort={sort} />
				</div>
			</div>

			<div className="grid gap-6">
				{filteredOrders.map(order => (
					<OrderCard key={order.id} order={order} view={view} />
				))}
			</div>

			<FilterModal
				isOpen={isFilterModalOpen}
				filters={filters}
				onApplyFilters={newFilters => {
					setFilters(newFilters)
					setIsFilterModalOpen(false)
				}}
				onClose={() => setIsFilterModalOpen(false)}
			/>
		</div>
	)
}

export default Orders