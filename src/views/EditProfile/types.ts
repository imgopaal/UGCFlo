export interface User {
	id: string
	firstName: string
	lastName: string
	email: string
	phone: string
	bio: string
	isPublic: boolean
	isVerified: boolean
	avatar: string
	portfolioItems: PortfolioItem[]
}

export interface PortfolioItem {
	id: string
	url: string
	type: 'image' | 'video'
}
