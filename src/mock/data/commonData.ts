import { ArrowUpSquare, Camera, HandMetal, Play } from 'lucide-react'

export const notificationListData = []

export const searchQueryPoolData = []

export const videoTypes = [
	{
		icon: Camera,
		title: 'Up to the creator',
		description: 'Our creators will send you their most creative takes',
	},
	{
		icon: ArrowUpSquare,
		title: 'Testimonial',
		description: "Honest comments about your product from a customer's perspective",
	},
	{
		icon: HandMetal,
		title: 'Unboxing',
		description: 'Taking your product out of its original box and doing a short review',
	},
	{
		icon: Play,
		title: 'How to',
		description: 'Creators will record themselves explaining how your product works',
	},
]

export const ageRanges = ['Any', '18-24', '25-34', '35-44', '45+']

export const genderOptions = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
	{ value: 'any', label: 'Any' },
]

export const countryOptions = [
	{ value: 'usa', label: 'United States' },
	{ value: 'canada', label: 'Canada' },
	{ value: 'mexico', label: 'Mexico' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'france', label: 'France' },
	{ value: 'germany', label: 'Germany' },
	{ value: 'australia', label: 'Australia' },
	{ value: 'china', label: 'China' },
	{ value: 'india', label: 'India' },
	{ value: 'japan', label: 'Japan' },
	{ value: 'brazil', label: 'Brazil' },
	{ value: 'italy', label: 'Italy' },
	{ value: 'south africa', label: 'South Africa' },
	{ value: 'south korea', label: 'South Korea' },
	{ value: 'spain', label: 'Spain' },
	{ value: 'russia', label: 'Russia' },
	{ value: 'sweden', label: 'Sweden' },
	{ value: 'switzerland', label: 'Switzerland' },
	{ value: 'netherlands', label: 'Netherlands' },
	{ value: 'new zealand', label: 'New Zealand' },
]
