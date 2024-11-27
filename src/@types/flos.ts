import { z } from 'zod'

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

export const FloFormSchema = z.object({
	title: z.string().min(1, 'Title is required').max(100),
	videoType: z.string().min(1, 'Please select a video type'),
	videoCount: z.number().min(1).max(10),
	creatorPreferences: z.object({
		gender: z.string().min(1, 'Gender preference is required'),
		ageRange: z.string().min(1, 'Age range is required'),
		country: z.string().min(1, 'Country is required'),
		otherPreferences: z.string().min(1, 'Other preferences are required'),
	}),
})

export type FloFormData = z.infer<typeof FloFormSchema>

export type CreatorPreferenceField = keyof FloFormData['creatorPreferences']

export type ValidationErrors = {
	[K in keyof FloFormData]?: string
} & {
	'creatorPreferences.gender'?: string
	'creatorPreferences.ageRange'?: string
	'creatorPreferences.country'?: string
	'creatorPreferences.otherPreferences'?: string
}
