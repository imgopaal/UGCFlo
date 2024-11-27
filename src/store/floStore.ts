import { create } from 'zustand'
import { FloFormData, FloFormSchema, ValidationErrors, CreatorPreferenceField } from '@/@types/flos'
import toast from 'react-hot-toast'

interface FloStore {
	formData: FloFormData
	errors: ValidationErrors
	isLoading: boolean
	setField: (field: keyof FloFormData, value: any) => void
	setCreatorPreference: (field: CreatorPreferenceField, value: string) => void
	validateForm: () => boolean
	calculatePrice: () => number
	saveDraft: () => Promise<void>
	completeOrder: () => Promise<boolean>
	setErrors: (errors: ValidationErrors) => void
	resetForm: () => void
}

const initialFormData: FloFormData = {
	title: '',
	videoType: '',
	videoCount: 0,
	creatorPreferences: {
		gender: '',
		ageRange: '',
		country: '',
		otherPreferences: '',
	},
}

export const useFloStore = create<FloStore>((set, get) => ({
	formData: initialFormData,
	errors: {},
	isLoading: false,

	setField: (field, value) => {
		set(state => ({
			formData: {
				...state.formData,
				[field]: value,
			},
		}))
	},

	setCreatorPreference: (field, value) => {
		set(state => ({
			formData: {
				...state.formData,
				creatorPreferences: {
					...state.formData.creatorPreferences,
					[field]: value,
				},
			},
		}))
	},

	setErrors: errors => {
		set({ errors })
	},

	resetForm: () => {
		set({
			formData: {
				title: '',
				videoType: '',
				videoCount: 0,
				creatorPreferences: {
					gender: '',
					ageRange: '',
					country: '',
					otherPreferences: '',
				},
			},
			errors: {},
			isLoading: false,
		})
	},

	validateForm: () => {
		try {
			FloFormSchema.parse(get().formData)
			set({ errors: {} })
			return true
		} catch (error) {
			const validationErrors: ValidationErrors = {}
			if (error instanceof Error) {
				const zodError = JSON.parse(error.message)
				zodError.forEach((err: any) => {
					const path = err.path.join('.')
					validationErrors[path] = err.message
				})
			}
			set({ errors: validationErrors })
			return false
		}
	},

	calculatePrice: () => {
		const { videoCount } = get().formData
		const basePrice = 249
		return basePrice * videoCount
	},

	saveDraft: async () => {
		const { formData, resetForm } = get()
		console.log('Saving draft:', formData)
		toast.success('Draft saved successfully!')
		resetForm()
	},

	completeOrder: async () => {
		const { formData, validateForm, resetForm } = get()
		if (!validateForm()) {
			return false
		}

		set({ isLoading: true })

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000))

			// Simulate API response
			const response = await Promise.resolve({ success: true })

			if (response.success) {
				toast.success('Flo created successfully!')
				console.log(formData, 'Flo Data')
				resetForm()
				console.log(formData, 'Flo Data after reset')
				return true
			}

			return false
		} catch (error) {
			toast.error('Failed to create Flo. Please try again.')
			return false
		} finally {
			set({ isLoading: false })
		}
	},
}))
