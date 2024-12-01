import { FormSection } from '@/components/pages/Flo'
import { Input } from '@/components/ui'
import { useFloStore } from '@/store/floStore'
import { useScrollToError } from '@/utils/hooks/useScrollToError'

export function BasicInfoStep() {
	const { formData, errors, setField, nextStep } = useFloStore()
	const { registerRef } = useScrollToError(errors)

	return (
		<div className="space-y-8">
			<FormSection
				ref={el => registerRef('title', el)}
				title="Title"
				description="This information will not be visible to creators. Creators will only see your brand and product details."
				error={errors.title}
			>
				<Input
					type="text"
					value={formData.title}
					placeholder="Example: First Flo"
					className="bg-white w-full max-w-xl px-3 py-2 border border-gray-300 rounded-md"
					onChange={e => setField('title', e.target.value)}
				/>
			</FormSection>

			<div className="flex justify-end">
				<button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90" onClick={nextStep}>
					Next Step
				</button>
			</div>
		</div>
	)
}
