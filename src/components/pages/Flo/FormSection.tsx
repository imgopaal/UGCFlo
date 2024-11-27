import { forwardRef } from 'react'

interface FormSectionProps {
	title: string
	description?: string
	children: React.ReactNode
	error?: string
	fieldName?: string
	ref?: React.Ref<HTMLDivElement>
}

export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(
	({ title, description, children, error, fieldName }, ref) => {
		return (
			<div ref={ref} className="space-y-4">
				<label className="block font-medium text-lg">{title}</label>
				{description && <p className="text-sm text-gray-500">{description}</p>}
				{children}
				{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
			</div>
		)
	}
)

FormSection.displayName = 'FormSection';
