export interface OrderFilters {
	status?: string[]
	minBudget?: number
	maxBudget?: number
	deadline?: string
	industry?: string[]
}

export type SortOption = {
	field: 'deadline' | 'budget' | 'applicants' | 'title'
	direction: 'asc' | 'desc'
}

export type OrderStatus = 'active' | 'completed' | 'draft' | 'in_review' | 'revision_requested'

export interface Order {
	id: string
	title: string
	description: string
	status: OrderStatus
	budget: string
	applicants: number
	approved: number
	total: number
	deadline: string
	image: string
	brand: {
		name: string
		logo: string
	}
	requirements: string[]
	deliverables: {
		type: 'video' | 'photo'
		duration?: string
		quantity: number
	}[]
}
