import { Order, OrderFilters, SortOption } from '@/views/Orders/types'

export const filterOrders = (orders: Order[], filters: OrderFilters, searchQuery: string): Order[] => {
	return orders.filter(order => {
		const matchesSearch =
			!searchQuery ||
			order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.description.toLowerCase().includes(searchQuery.toLowerCase())

		const matchesStatus = !filters.status?.length || filters.status.includes(order.status)

		const budget = parseInt(order.budget.replace(/[^0-9-]/g, '').split('-')[0])
		const matchesBudget =
			(!filters.minBudget || budget >= filters.minBudget) && (!filters.maxBudget || budget <= filters.maxBudget)

		const matchesDeadline = !filters.deadline || new Date(order.deadline) <= new Date(filters.deadline)

		return matchesSearch && matchesStatus && matchesBudget && matchesDeadline
	})
}

export const sortOrders = (orders: Order[], sort: SortOption): Order[] => {
	return [...orders].sort((a, b) => {
		switch (sort.field) {
			case 'deadline': {
				return sort.direction === 'asc'
					? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
					: new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
			}
			case 'budget': {
				const budgetA = parseInt(a.budget.replace(/[^0-9-]/g, '').split('-')[0])
				const budgetB = parseInt(b.budget.replace(/[^0-9-]/g, '').split('-')[0])
				return sort.direction === 'asc' ? budgetA - budgetB : budgetB - budgetA
			}
			case 'applicants': {
				return sort.direction === 'asc' ? a.applicants - b.applicants : b.applicants - a.applicants
			}
			case 'title': {
				return sort.direction === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
			}
			default:
				return 0
		}
	})
}
