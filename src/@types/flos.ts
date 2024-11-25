export interface Flo {
	id: number
	name: string
	description: string
	status: 'Active' | 'Draft' | 'Completed'
	applicants: number
	approved: number
	total: number
	dateCreated: string
	image: string
	budget: string
	deadline: string
}
