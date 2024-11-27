import { useEffect, useRef } from 'react'
import { ValidationErrors } from '@/types/flo'

export function useScrollToError(errors: ValidationErrors) {
	const refs = useRef<{ [key: string]: HTMLDivElement | null }>({})

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			const firstError = Object.keys(errors)[0]
			const errorRef = refs.current[firstError]

			if (errorRef) {
				errorRef.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
			}
		}
	}, [errors])

	const registerRef = (field: string, element: HTMLDivElement | null) => {
		refs.current[field] = element
	}

	return { registerRef }
}
